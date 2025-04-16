import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IBookingService } from './ibooking.service';
import { UUID } from 'crypto';
import { Booking } from './booking.entity';
import { CreateDraftBookingDto } from './dtos/requests/create-draft-booking.dto';
import {
  Between,
  DataSource,
  EntityManager,
  LessThanOrEqual,
  MoreThanOrEqual,
  Not,
  Repository,
} from 'typeorm';
import { PaymentStatusEnum } from 'src/payments/enums/payment-status.enum';
import { FieldService } from 'src/fields/field.service';
import { isBetweenTime } from 'src/util/is-between-time';
import { PersonService } from 'src/people/person.service';
import { SportService } from 'src/sports/sport.service';
import { BookingSlot } from 'src/booking-slots/booking-slot.entity';
import { BookingSlotService } from 'src/booking-slots/booking-slot.service';
import { duration } from 'src/util/duration';
import { durationOverlapTime } from 'src/util/duration-overlap-time';
import { PaymentService } from 'src/payments/payment.service';
import { UpdateBookingSlotDto } from './dtos/requests/update-booking-slot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingStatusEnum } from './enums/booking-status.enum';
import { UpdateAdditionalServicesDto } from './dtos/requests/update-additional-services.dto';
import { AdditionalService } from 'src/additional-services/additional-service.entity';
import { ServiceService } from 'src/services/service.service';
import { AdditionalServiceService } from 'src/additional-services/additional-service.service';
import { UnitEnum } from 'src/services/enums/unit.enum';
import { FacilityStatusEnum } from 'src/facilities/enums/facility-status.enum';
import { FieldStatusEnum } from 'src/fields/enums/field-status.enum';

@Injectable()
export class BookingService implements IBookingService {
  constructor(
    /**
     * inject FieldService
     */
    private readonly fieldService: FieldService,
    /**
     *
     * inject DataSource
     */
    private readonly dataSource: DataSource,
    /**
     * inject PersonService
     */
    private readonly personService: PersonService,
    /**
     * inject SportService
     */
    private readonly sportService: SportService,
    /**
     * inject BookingSlotService
     */
    private readonly bookingSlotService: BookingSlotService,
    /**
     * inject PaymentService
     */
    private readonly paymentService: PaymentService,
    /**
     * inject BookingRepository
     */
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    /**
     * inject ServiceService
     */
    @Inject(forwardRef(() => ServiceService))
    private readonly serviceService: ServiceService,
    /**
     * inject AdditionalService
     */
    private readonly additionalServiceService: AdditionalServiceService,
  ) {}

  public async createDraft(
    createDraftBookingDto: CreateDraftBookingDto,
    playerId: UUID,
  ): Promise<Booking> {
    if (createDraftBookingDto.bookingSlots.length === 0)
      throw new BadRequestException('You must choose at least one field');

    const firstField = await this.fieldService.findOneById(
      createDraftBookingDto.bookingSlots[0].fieldId,
      ['fieldGroup.facility'],
    );

    if (firstField.fieldGroup.facility.status !== FacilityStatusEnum.ACTIVE) {
      throw new BadRequestException('The facility of field must be actived');
    }

    const fieldGroupId = firstField.fieldGroup.id;
    const facility = firstField.fieldGroup.facility;

    // check startTime and endTime between openTime1 and closeTime1
    isBetweenTime(
      createDraftBookingDto.startTime,
      createDraftBookingDto.endTime,
      facility.openTime1,
      facility.closeTime1,
      'Booking time not between open time and close time',
    );
    // check startTime and endTime between openTime2 and closeTime2
    if (facility.openTime2 && facility.closeTime2) {
      isBetweenTime(
        createDraftBookingDto.startTime,
        createDraftBookingDto.endTime,
        facility.openTime2,
        facility.closeTime2,
        'Booking time not between open time and close time',
      );
    }
    // check startTime and endTime between openTime3 and closeTime3
    if (facility.openTime3 && facility.closeTime3) {
      isBetweenTime(
        createDraftBookingDto.startTime,
        createDraftBookingDto.endTime,
        facility.openTime3,
        facility.closeTime3,
        'Booking time not between open time and close time',
      );
    }

    return await this.dataSource.transaction<Booking>(async (manager) => {
      // get player by id
      const player = await this.personService.findOneByIdWithTransaction(
        playerId,
        manager,
      );

      // get sport by id
      const sport = await this.sportService.findOneByIdWithTransaction(
        createDraftBookingDto.sportId,
        manager,
      );

      // create booking
      const booking = manager.create(Booking, {
        ...createDraftBookingDto,
        player,
        sport,
      });

      await manager.save(booking);

      const bookingSlots: BookingSlot[] = [];

      let fieldPrice = 0;

      // check and create bookingSlots
      for (const bookingSlot of createDraftBookingDto.bookingSlots) {
        // get field by id
        const field = await this.fieldService.findOneByIdWithTransaction(
          bookingSlot.fieldId,
          manager,
          ['fieldGroup.facility', 'fieldGroup.sports'],
        );

        if (field.status === FieldStatusEnum.CLOSED) {
          throw new BadRequestException(`${field.name} field  is closed`);
        }

        // check fields have same field group
        if (field.fieldGroup.id !== fieldGroupId) {
          throw new BadRequestException('Fields must have same field group');
        }

        // check field includes sport
        if (
          !field.fieldGroup.sports.find(
            (sport) => sport.id === createDraftBookingDto.sportId,
          )
        ) {
          throw new BadRequestException('Field does not include this sport');
        }

        // check not overlap with other booking
        await this.checkOverlapBookingsWithTransaction(
          bookingSlot.fieldId,
          bookingSlot.date,
          createDraftBookingDto.startTime,
          createDraftBookingDto.endTime,
          manager,
        );

        // create bookingSlot
        const newBookingSlot =
          await this.bookingSlotService.createWithTransaction(
            field,
            bookingSlot.date,
            booking,
            manager,
          );

        bookingSlots.push(newBookingSlot);

        const playTime = duration(
          createDraftBookingDto.endTime,
          createDraftBookingDto.startTime,
        );

        fieldPrice = field.fieldGroup.basePrice * playTime;

        if (field.fieldGroup.numberOfPeaks > 0) {
          const overlapPeak = durationOverlapTime(
            field.fieldGroup.peakStartTime1!,
            field.fieldGroup.peakEndTime1!,
            createDraftBookingDto.startTime,
            createDraftBookingDto.endTime,
          );

          fieldPrice += overlapPeak * field.fieldGroup.priceIncrease1!;
        }

        if (field.fieldGroup.numberOfPeaks > 1) {
          const overlapPeak = durationOverlapTime(
            field.fieldGroup.peakStartTime2!,
            field.fieldGroup.peakEndTime2!,
            createDraftBookingDto.startTime,
            createDraftBookingDto.endTime,
          );

          fieldPrice += overlapPeak * field.fieldGroup.priceIncrease2!;
        }

        if (field.fieldGroup.numberOfPeaks > 2) {
          const overlapPeak = durationOverlapTime(
            field.fieldGroup.peakStartTime3!,
            field.fieldGroup.peakEndTime3!,
            createDraftBookingDto.startTime,
            createDraftBookingDto.endTime,
          );

          fieldPrice += overlapPeak * field.fieldGroup.priceIncrease3!;
        }
      }

      // create payment
      const payment = await this.paymentService.createWithTransaction(
        fieldPrice,
        booking,
        manager,
      );

      booking.payment = payment;
      booking.bookingSlots = bookingSlots;

      return booking;
    });
  }

  private async checkOverlapBookingsWithTransaction(
    fieldId: number,
    date: Date,
    startTime: string,
    endTime: string,
    manager: EntityManager,
  ) {
    const overlapBooking = await manager.findOne(Booking, {
      where: [
        {
          bookingSlots: {
            field: {
              id: fieldId,
            },
            date: date,
          },
          startTime: Between(startTime, endTime),
          payment: {
            status: Not(PaymentStatusEnum.CANCELLED),
          },
        },
        {
          bookingSlots: {
            field: {
              id: fieldId,
            },
            date: date,
          },
          payment: {
            status: Not(PaymentStatusEnum.CANCELLED),
          },
          endTime: Between(startTime, endTime),
        },
        {
          bookingSlots: {
            field: {
              id: fieldId,
            },
            date: date,
          },
          payment: {
            status: Not(PaymentStatusEnum.CANCELLED),
          },
          startTime: LessThanOrEqual(startTime),
          endTime: MoreThanOrEqual(endTime),
        },
      ],
    });

    if (overlapBooking) {
      throw new BadRequestException(
        'Booking time overlap with another booking',
      );
    }
  }

  public async updateBookingSlot(
    bookingId: UUID,
    updateBookingSlotDto: UpdateBookingSlotDto,
    playerId: UUID,
  ): Promise<Booking> {
    const booking = await this.findOneByIdAndPlayer(bookingId, playerId, [
      'sport',
      'bookingSlots',
      'payment',
    ]);

    if (booking.status !== BookingStatusEnum.DRAFT) {
      throw new BadRequestException('The booking must be draft');
    }

    if (updateBookingSlotDto.bookingSlots.length === 0) {
      throw new BadRequestException('You must choose at least one field');
    }

    const firstField = await this.fieldService.findOneById(
      updateBookingSlotDto.bookingSlots[0].fieldId,
      ['fieldGroup'],
    );

    return await this.dataSource.transaction<Booking>(async (manager) => {
      // delete old booking slots
      for (const bookingSlot of booking.bookingSlots) {
        await manager.remove(bookingSlot);
      }

      let fieldPrice = 0;

      const bookingSlots: BookingSlot[] = [];

      for (const bookingSlot of updateBookingSlotDto.bookingSlots) {
        const field = await this.fieldService.findOneByIdWithTransaction(
          bookingSlot.fieldId,
          manager,
          ['fieldGroup.facility', 'fieldGroup.sports'],
        );

        if (field.fieldGroup.id !== firstField.fieldGroup.id) {
          throw new BadRequestException('Fields must have same field group');
        }

        if (
          !field.fieldGroup.sports.find(
            (sport) => sport.id === booking.sport.id,
          )
        ) {
          throw new BadRequestException('Field does not include this sport');
        }

        await this.checkOverlapBookingsWithTransaction(
          bookingSlot.fieldId,
          bookingSlot.date,
          booking.startTime,
          booking.endTime,
          manager,
        );

        const newBookingSlot =
          await this.bookingSlotService.createWithTransaction(
            field,
            bookingSlot.date,
            booking,
            manager,
          );

        bookingSlots.push(newBookingSlot);
      }

      const playTime = duration(booking.endTime, booking.startTime);

      fieldPrice =
        playTime *
        firstField.fieldGroup.basePrice *
        updateBookingSlotDto.bookingSlots.length;

      if (firstField.fieldGroup.numberOfPeaks > 0) {
        const overlapPeak = durationOverlapTime(
          firstField.fieldGroup.peakStartTime1!,
          firstField.fieldGroup.peakEndTime1!,
          booking.startTime,
          booking.endTime,
        );

        fieldPrice +=
          overlapPeak *
          firstField.fieldGroup.priceIncrease1! *
          updateBookingSlotDto.bookingSlots.length;
      }

      if (firstField.fieldGroup.numberOfPeaks > 1) {
        const overlapPeak = durationOverlapTime(
          firstField.fieldGroup.peakStartTime2!,
          firstField.fieldGroup.peakEndTime2!,
          booking.startTime,
          booking.endTime,
        );

        fieldPrice +=
          overlapPeak *
          firstField.fieldGroup.priceIncrease2! *
          updateBookingSlotDto.bookingSlots.length;
      }

      if (firstField.fieldGroup.numberOfPeaks > 2) {
        const overlapPeak = durationOverlapTime(
          firstField.fieldGroup.peakStartTime3!,
          firstField.fieldGroup.peakEndTime3!,
          booking.startTime,
          booking.endTime,
        );

        fieldPrice +=
          overlapPeak *
          firstField.fieldGroup.priceIncrease3! *
          updateBookingSlotDto.bookingSlots.length;
      }

      const payment = booking.payment;
      payment.fieldPrice = fieldPrice;

      await manager.save(payment);

      booking.payment = payment;
      booking.bookingSlots = bookingSlots;

      return booking;
    });
  }

  public async findOneByIdAndPlayer(
    bookingId: UUID,
    playerId: UUID,
    relations?: string[],
  ): Promise<Booking> {
    return this.bookingRepository
      .findOneOrFail({
        relations,
        where: {
          id: bookingId,
          player: {
            id: playerId,
          },
        },
      })
      .catch(() => {
        throw new NotFoundException(
          `Not found booking id: ${bookingId} with the player`,
        );
      });
  }

  public async updateAdditionalServices(
    bookingId: UUID,
    updateAdditionalServiceDto: UpdateAdditionalServicesDto,
    playerId: UUID,
  ): Promise<Booking> {
    const booking = await this.findOneByIdAndPlayer(bookingId, playerId, [
      'sport',
      'additionalServices',
      'bookingSlots',
      'payment',
    ]);

    if (booking.status !== BookingStatusEnum.DRAFT) {
      throw new BadRequestException('The booking must be draft');
    }

    const playTime = duration(booking.startTime, booking.endTime);

    return await this.dataSource.transaction<Booking>(async (manager) => {
      // remove old additional service
      for (const additionalService of booking.additionalServices) {
        await manager.remove(additionalService);
      }

      let servicePrice = 0;

      const additionalServices: AdditionalService[] = [];

      for (const additionalService of updateAdditionalServiceDto.additionalServices) {
        const service = await this.serviceService.findOneByIdWithTransaction(
          additionalService.serviceId,
          manager,
          ['sport'],
        );

        for (const bookingSlot of booking.bookingSlots) {
          const overLapAdditionalServices = await manager.find(
            AdditionalService,
            {
              where: [
                {
                  serviceId: additionalService.serviceId,
                  booking: {
                    bookingSlots: {
                      date: bookingSlot.date,
                    },
                    payment: {
                      status: Not(PaymentStatusEnum.CANCELLED),
                    },
                    startTime: Between(booking.startTime, booking.endTime),
                  },
                },
                {
                  serviceId: additionalService.serviceId,
                  booking: {
                    bookingSlots: {
                      date: bookingSlot.date,
                    },
                    payment: {
                      status: Not(PaymentStatusEnum.CANCELLED),
                    },
                    endTime: Between(booking.startTime, booking.endTime),
                  },
                },
                {
                  serviceId: additionalService.serviceId,
                  booking: {
                    bookingSlots: {
                      date: bookingSlot.date,
                    },
                    payment: {
                      status: Not(PaymentStatusEnum.CANCELLED),
                    },
                    startTime: LessThanOrEqual(booking.startTime),
                    endTime: MoreThanOrEqual(booking.endTime),
                  },
                },
              ],
            },
          );

          const amountOfServiceRetend = overLapAdditionalServices.reduce(
            (prev, curr) => prev + curr.quantity,
            0,
          );

          if (
            service.amount <
            amountOfServiceRetend + additionalService.quantity
          ) {
            throw new BadRequestException(
              `Service ${additionalService.serviceId} is out of stock in date ${bookingSlot.date.toISOString()}}`,
            );
          }
        }

        if (service.unit === UnitEnum.QUANTITY) {
          // caculator follow quantity

          servicePrice +=
            service.price *
            additionalService.quantity *
            booking.bookingSlots.length;
        } else {
          servicePrice +=
            service.price *
            additionalService.quantity *
            booking.bookingSlots.length *
            playTime;
        }

        const newAdditionalService =
          await this.additionalServiceService.createWithTransaction(
            booking,
            service,
            additionalService.quantity,
            manager,
          );

        additionalServices.push(newAdditionalService);
      }

      const payment = booking.payment;

      payment.servicePrice = servicePrice;
      await manager.save(payment);

      booking.additionalServices = additionalServices;

      return booking;
    });
  }

  public async findOneById(
    bookingId: UUID,
    relations?: string[],
  ): Promise<Booking> {
    return this.bookingRepository
      .findOneOrFail({
        relations,
        where: {
          id: bookingId,
        },
      })
      .catch(() => {
        throw new BadRequestException(`Not found the booking ${bookingId}`);
      });
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { IBookingService } from './ibooking.service';
import { UUID } from 'crypto';
import { Booking } from './booking.entity';
import { CreateDraftBookingDto } from './dtos/requests/create-draft-booking.dto';
import {
  Between,
  DataSource,
  LessThanOrEqual,
  MoreThanOrEqual,
  Not,
  QueryRunner,
} from 'typeorm';
import { PaymentStatusEnum } from 'src/payments/enums/payment-status.enum';
import { FieldService } from 'src/fields/field.service';
import { isBetweenTime } from 'src/util/is-between-time';
import { PersonService } from 'src/people/person.service';
import { SportService } from 'src/sports/sport.service';

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
  ) {}

  public async createDraft(
    createDraftBookingDto: CreateDraftBookingDto,
    playerId: UUID,
  ): Promise<Booking> {
    throw new BadRequestException('chua ho tro');
    // if (createDraftBookingDto.bookingSlots.length === 0)
    //   throw new BadRequestException('You must choose at least one field');
    // const firstField = await this.fieldService.findOneById(
    //   createDraftBookingDto.bookingSlots[0].fieldId,
    //   ['fieldGroup.facility'],
    // );
    // const fieldGroupId = firstField.fieldGroup.id;
    // const facility = firstField.fieldGroup.facility;
    // // check startTime and endTime between openTime1 and closeTime1
    // isBetweenTime(
    //   createDraftBookingDto.startTime,
    //   createDraftBookingDto.endTime,
    //   facility.openTime1,
    //   facility.closeTime1,
    //   'Booking time not between open time and close time',
    // );
    // // check startTime and endTime between openTime2 and closeTime2
    // if (facility.openTime2 && facility.closeTime2) {
    //   isBetweenTime(
    //     createDraftBookingDto.startTime,
    //     createDraftBookingDto.endTime,
    //     facility.openTime2,
    //     facility.closeTime2,
    //     'Booking time not between open time and close time',
    //   );
    // }
    // // check startTime and endTime between openTime3 and closeTime3
    // if (facility.openTime3 && facility.closeTime3) {
    //   isBetweenTime(
    //     createDraftBookingDto.startTime,
    //     createDraftBookingDto.endTime,
    //     facility.openTime3,
    //     facility.closeTime3,
    //     'Booking time not between open time and close time',
    //   );
    // }
    // return await this.dataSource.transaction<Booking>(
    //   async (manager: EntityManager) => {
    //     // get player by id
    //     const player = await this.personService.findOneByIdWithTransaction(
    //       playerId,
    //       manager,
    //     );
    //     // get sport by id
    //     const sport = await this.sportService.findOneByIdWithTransaction(
    //       createDraftBookingDto.sportId,
    //       manager,
    //     );
    //     // create booking
    //     const booking = manager.create(Booking, {
    //       ...createDraftBookingDto,
    //       player,
    //       sport,
    //     });
    //     const bookingSlots: BookingSlot[] = [];
    //     let fieldPrice = 0;
    //     // check and create bookingSlots
    //     for (const bookingSlot of createDraftBookingDto.bookingSlots) {
    //       // get field by id
    //       const field = await this.fieldService.findOneWithTransaction(
    //         bookingSlot.fieldId,
    //         queryRunner,
    //         ['fieldGroup.facility', 'fieldGroup.sports'],
    //       );
    //       // check fields have same field group
    //       if (field.fieldGroup.id !== fieldGroupId) {
    //         throw new BadRequestException('Fields must have same field group');
    //       }
    //       // check field includes sport
    //       if (
    //         !field.fieldGroup.sports.find(
    //           (sport) => sport.id === createDraftBookingDto.sportId,
    //         )
    //       ) {
    //         throw new BadRequestException('Field does not include this sport');
    //       }
    //       // check not overlap with other booking
    //       await this.checkOverlapBookingsWithTransaction(
    //         bookingSlot.fieldId,
    //         bookingSlot.date,
    //         createDraftBookingDto.startTime,
    //         createDraftBookingDto.endTime,
    //         queryRunner,
    //       );
    //       // create bookingSlot
    //       const newBookingSlot =
    //         await this.bookingSlotService.createWithTransaction(
    //           field,
    //           bookingSlot.date,
    //           booking,
    //           queryRunner,
    //         );
    //       bookingSlots.push(newBookingSlot);
    //       const playTime = duration(
    //         createDraftBookingDto.endTime,
    //         createDraftBookingDto.startTime,
    //       );
    //       fieldPrice = field.fieldGroup.basePrice * playTime;
    //       if (field.fieldGroup.numberOfPeaks > 0) {
    //         const overlapPeak = durationOverlapTime(
    //           field.fieldGroup.peakStartTime1,
    //           field.fieldGroup.peakEndTime1,
    //           createDraftBookingDto.startTime,
    //           createDraftBookingDto.endTime,
    //         );
    //         fieldPrice += overlapPeak * field.fieldGroup.priceIncrease1!;
    //       }
    //       if (field.fieldGroup.numberOfPeaks > 1) {
    //         const overlapPeak = durationOverlapTime(
    //           field.fieldGroup.peakStartTime2,
    //           field.fieldGroup.peakEndTime2,
    //           createDraftBookingDto.startTime,
    //           createDraftBookingDto.endTime,
    //         );
    //         fieldPrice += overlapPeak * field.fieldGroup.priceIncrease2!;
    //       }
    //       if (field.fieldGroup.numberOfPeaks > 2) {
    //         const overlapPeak = durationOverlapTime(
    //           field.fieldGroup.peakStartTime3,
    //           field.fieldGroup.peakEndTime3,
    //           createDraftBookingDto.startTime,
    //           createDraftBookingDto.endTime,
    //         );
    //         fieldPrice += overlapPeak * field.fieldGroup.priceIncrease3!;
    //       }
    //     }
    //     // create payment
    //     const payment = await this.paymentService.createWithTransaction(
    //       fieldPrice,
    //       booking,
    //       queryRunner,
    //     );
    //     booking.payment = payment;
    //     booking.bookingSlots = bookingSlots;
    //     return booking;
    //   },
    // );
  }

  private async checkOverlapBookingsWithTransaction(
    fieldId: number,
    date: Date,
    startTime: string,
    endTime: string,
    queryRunner: QueryRunner,
  ) {
    const overlapBooking = await queryRunner.manager.findOne(Booking, {
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
}

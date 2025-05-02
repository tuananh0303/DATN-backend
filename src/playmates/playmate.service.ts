import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { IPlaymateService } from './iplaymate.service';
import { UUID } from 'crypto';
import { CreatePlaymateDto } from './dtos/create-playmate.dto';
import { Repository } from 'typeorm';
import { Playmate } from './entities/playmate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingSlotService } from 'src/booking-slots/booking-slot.service';
import { UpdatePlaymateDto } from './dtos/update-playmate.dto';
import { PaymentStatusEnum } from 'src/payments/enums/payment-status.enum';
import { PlaymateParticipant } from './entities/playmate-participant.entity';
import { BookingSlot } from 'src/booking-slots/booking-slot.entity';
import { AcceptParticipantPlaymate } from './dtos/accept-participant-playmate.dto';

@Injectable()
export class PlaymateService implements IPlaymateService {
  constructor(
    /**
     * inject PlaymateRepository
     */
    @InjectRepository(Playmate)
    private readonly playmateRepository: Repository<Playmate>,
    /**
     * inject BookingSlotService
     */
    private readonly bookingSlotService: BookingSlotService,
    /**
     * inject PlaymateParticipantRepository
     */
    @InjectRepository(PlaymateParticipant)
    private readonly playmateParticipantRepository: Repository<PlaymateParticipant>,
  ) {}

  private async isBookingSlotCreated(bookingSlotId: number): Promise<boolean> {
    const existingPlaymate = await this.playmateRepository.findOne({
      where: {
        bookingSlot: {
          id: bookingSlotId,
        },
      },
    });

    return existingPlaymate ? true : false;
  }

  private async findBookingSlotAndCheck(
    bookingSlotId: number,
    playerId: UUID,
  ): Promise<BookingSlot> {
    const bookingSlot = await this.bookingSlotService.findOneByIdAndPlayer(
      bookingSlotId,
      playerId,
      ['booking.payment'],
    );

    if (bookingSlot.booking.payment.status !== PaymentStatusEnum.PAID) {
      throw new BadRequestException('The booking slot must be paid');
    }

    return bookingSlot;
  }

  public async create(
    createPlaymateDto: CreatePlaymateDto,
    playerId: UUID,
  ): Promise<{ message: string }> {
    const bookingSlot = await this.findBookingSlotAndCheck(
      createPlaymateDto.bookingSlotId,
      playerId,
    );

    if (await this.isBookingSlotCreated(createPlaymateDto.bookingSlotId)) {
      throw new BadRequestException('The booking slot have created yet');
    }

    const playmate = this.playmateRepository.create({
      ...createPlaymateDto,
      bookingSlot,
    });

    await this.playmateRepository.save(playmate);

    return {
      message: 'Create playmate successful',
    };
  }

  public async update(
    updatePlaymateDto: UpdatePlaymateDto,
    playerId: UUID,
  ): Promise<{ message: string }> {
    const playmate = await this.playmateRepository
      .findOneOrFail({
        where: {
          id: updatePlaymateDto.playmateId,
          bookingSlot: {
            booking: {
              player: {
                id: playerId,
              },
            },
          },
        },
      })
      .catch(() => {
        throw new BadRequestException('Not found the playmate');
      });

    try {
      if (updatePlaymateDto.title) playmate.title = updatePlaymateDto.title;

      if (updatePlaymateDto.imagesUrl)
        playmate.imagesUrl = updatePlaymateDto.imagesUrl;

      if (updatePlaymateDto.bookingSlotId) {
        const bookingSlot = await this.findBookingSlotAndCheck(
          updatePlaymateDto.bookingSlotId,
          playerId,
        );

        playmate.bookingSlot = bookingSlot;
      }

      if (updatePlaymateDto.description)
        playmate.desciption = updatePlaymateDto.description;

      if (updatePlaymateDto.additionalInfor)
        playmate.additionalInfo = updatePlaymateDto.additionalInfor;

      if (updatePlaymateDto.paymentType)
        playmate.paymentType = updatePlaymateDto.paymentType;

      if (updatePlaymateDto.totalCost)
        playmate.totalCost = updatePlaymateDto.totalCost;

      if (updatePlaymateDto.maleCost)
        playmate.maleCost = updatePlaymateDto.maleCost;

      if (updatePlaymateDto.femaleCost)
        playmate.femaleCost = updatePlaymateDto.femaleCost;

      if (updatePlaymateDto.detailOfCost)
        playmate.detailOfCost = updatePlaymateDto.detailOfCost;

      if (updatePlaymateDto.isTeam) playmate.isTeam = updatePlaymateDto.isTeam;

      if (updatePlaymateDto.minParticipant)
        playmate.minParticipant = updatePlaymateDto.minParticipant;

      if (updatePlaymateDto.maxParticipant)
        playmate.maxParticipant = updatePlaymateDto.maxParticipant;

      if (updatePlaymateDto.gender) playmate.gender = updatePlaymateDto.gender;

      if (updatePlaymateDto.level) playmate.level = updatePlaymateDto.level;

      await this.playmateRepository.save(playmate);
    } catch (error) {
      throw new BadRequestException(String(error));
    }

    return {
      message: 'Update playmate successful',
    };
  }

  public async register(
    playmateId: UUID,
    playerId: UUID,
  ): Promise<{ message: string }> {
    const playmate = await this.playmateRepository
      .findOneOrFail({
        relations: {
          participants: true,
          bookingSlot: {
            booking: {
              player: true,
            },
          },
        },
        where: {
          id: playmateId,
        },
      })
      .catch(() => {
        throw new NotFoundException('Not found the playmate');
      });

    if (playmate.bookingSlot.booking.player.id === playerId) {
      throw new BadRequestException('You are owner of the post');
    }

    for (const participant of playmate.participants) {
      if (participant.playerId === playerId) {
        throw new BadRequestException('You have registed this post yet');
      }
    }

    const participant = this.playmateParticipantRepository.create({
      playerId,
      playmateId,
    });

    await this.playmateParticipantRepository.save(participant);

    return {
      message: 'Register successfull',
    };
  }

  public async getMany(): Promise<Playmate[]> {
    const playmates = await this.playmateRepository.find({
      relations: {
        bookingSlot: {
          booking: {
            player: true,
          },
        },
        participants: {
          player: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return playmates;
  }

  public async getDetail(playmateId: UUID): Promise<Playmate> {
    const playmate = await this.playmateRepository
      .findOneOrFail({
        relations: {
          bookingSlot: {
            booking: {
              player: true,
            },
          },
          participants: {
            player: true,
          },
        },
        where: {
          id: playmateId,
        },
      })
      .catch(() => {
        throw new BadRequestException('Not found the playmate');
      });

    return playmate;
  }

  public async switchAccept(
    acceptParticipantPlaymate: AcceptParticipantPlaymate,
    playerId: UUID,
  ): Promise<{ message: string }> {
    const playmate = await this.playmateRepository
      .findOneOrFail({
        where: {
          id: acceptParticipantPlaymate.playmateId,
          participants: {
            playerId: acceptParticipantPlaymate.playerId,
          },
        },
        relations: {
          bookingSlot: {
            booking: {
              player: true,
            },
          },
          participants: true,
        },
      })
      .catch(() => {
        throw new NotFoundException(
          `Not found the playmate with id: ${acceptParticipantPlaymate.playmateId} and participant: ${acceptParticipantPlaymate.playerId}`,
        );
      });

    if (playmate.bookingSlot.booking.player.id !== playerId) {
      throw new NotAcceptableException('You are not owner of playmate post');
    }

    const participant = playmate.participants[0];

    participant.isAccept = !participant.isAccept;

    await this.playmateParticipantRepository.save(participant);

    return {
      message: 'Switch accept successfull',
    };
  }
}

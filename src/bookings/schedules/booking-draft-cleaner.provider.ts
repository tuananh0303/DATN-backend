import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { Booking } from '../booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingStatusEnum } from '../enums/booking-status.enum';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BookingDraftCleanerProvider {
  constructor(
    /**
     * inject BookingRepository
     */
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  public async clearnBookingDraft() {
    const fiveMinutes = new Date(Date.now() - 10 * 60 * 1000);

    const expiredBookingDraft = await this.bookingRepository.find({
      where: {
        status: BookingStatusEnum.DRAFT,
        createdAt: LessThan(fiveMinutes),
      },
    });

    try {
      await this.bookingRepository.remove(expiredBookingDraft);
    } catch {
      throw new InternalServerErrorException(
        'An error occurred in BookingDraftCleaner',
      );
    }
  }
}

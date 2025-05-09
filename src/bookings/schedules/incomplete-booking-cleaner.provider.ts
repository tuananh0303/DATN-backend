import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { Booking } from '../booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingStatusEnum } from '../enums/booking-status.enum';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class IncompleteBookingCleaner {
  constructor(
    /**
     * inject BookingRepository
     */
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  @Cron('0 */15 * * * *')
  public async cleanIncompleteBooking() {
    const fiftenMinutes = new Date(Date.now() - 15 * 60 * 1000);

    const expiredBookingDraft = await this.bookingRepository.find({
      where: {
        status: BookingStatusEnum.INCOMPLETE,
        updatedAt: LessThan(fiftenMinutes),
      },
    });

    try {
      await this.bookingRepository.remove(expiredBookingDraft);
    } catch {
      throw new InternalServerErrorException(
        'An error occurred in clean incomplete booking',
      );
    }
  }
}

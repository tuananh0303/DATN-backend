import { BadRequestException, Injectable } from '@nestjs/common';
import { IBookingSlotService } from './ibooking-slot.service';
import { BookingSlot } from './booking-slot.entity';
import { Booking } from 'src/bookings/booking.entity';
import { Field } from 'src/fields/field.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class BookingSlotService implements IBookingSlotService {
  public async createWithTransaction(
    field: Field,
    date: Date,
    booking: Booking,
    manager: EntityManager,
  ): Promise<BookingSlot> {
    const bookingSlot = manager.create(BookingSlot, {
      field,
      date,
      booking,
    });

    try {
      return manager.save(bookingSlot);
    } catch {
      throw new BadRequestException(
        'An error occurred when create booking slot',
      );
    }
  }
}

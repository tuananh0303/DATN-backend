import { Field } from 'src/fields/field.entity';
import { BookingSlot } from './booking-slot.entity';
import { Booking } from 'src/bookings/booking.entity';
import { EntityManager } from 'typeorm';

export interface IBookingSlotService {
  createWithTransaction(
    field: Field,
    date: Date,
    booking: Booking,
    manager: EntityManager,
  ): Promise<BookingSlot>;
}

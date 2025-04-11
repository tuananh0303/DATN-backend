import { Booking } from 'src/bookings/booking.entity';
import { Field } from 'src/fields/field.entity';
export declare class BookingSlot {
    id: number;
    date: Date;
    field: Field;
    booking: Booking;
    afterLoad(): void;
}

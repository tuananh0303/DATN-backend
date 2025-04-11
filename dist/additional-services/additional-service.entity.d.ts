import { UUID } from 'crypto';
import { Booking } from 'src/bookings/booking.entity';
import { Service } from 'src/services/service.entity';
export declare class AdditionalService {
    serviceId: number;
    bookingId: UUID;
    quantity: number;
    service: Service;
    booking: Booking;
}

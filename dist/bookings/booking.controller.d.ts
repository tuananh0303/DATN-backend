import { BookingService } from './booking.service';
import { CreateDraftBookingDto } from './dtos/requests/create-draft-booking.dto';
import { UUID } from 'crypto';
export declare class BookingController {
    private readonly bookingService;
    constructor(bookingService: BookingService);
    createDraft(createDraftBookingDto: CreateDraftBookingDto, playerId: UUID): Promise<import("./booking.entity").Booking>;
}

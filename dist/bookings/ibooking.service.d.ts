import { UUID } from 'crypto';
import { Booking } from './booking.entity';
import { CreateDraftBookingDto } from './dtos/requests/create-draft-booking.dto';
export interface IBookingService {
    createDraft(createDraftBookingDto: CreateDraftBookingDto, playerId: UUID): Promise<Booking>;
}

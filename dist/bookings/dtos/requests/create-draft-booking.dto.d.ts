import { CreateBookingSlotDto } from 'src/booking-slots/dtos/requests/create-booking-slot.dto';
export declare class CreateDraftBookingDto {
    startTime: string;
    endTime: string;
    bookingSlots: CreateBookingSlotDto[];
    sportId: number;
}

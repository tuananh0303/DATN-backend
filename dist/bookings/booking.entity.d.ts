import { UUID } from 'crypto';
import { BookingStatusEnum } from './enums/booking-status.enum';
import { Person } from 'src/people/person.entity';
import { Sport } from 'src/sports/sport.entity';
import { BookingSlot } from 'src/booking-slots/booking-slot.entity';
import { AdditionalService } from 'src/additional-services/additional-service.entity';
import { Payment } from 'src/payments/payment.entity';
export declare class Booking {
    id: UUID;
    startTime: string;
    endTime: string;
    createdAt: Date;
    updatedAt: Date;
    status: BookingStatusEnum;
    player: Person;
    sport: Sport;
    bookingSlots: BookingSlot[];
    payment: Payment;
    additionalServices: AdditionalService[];
    beforeInsert(): void;
}

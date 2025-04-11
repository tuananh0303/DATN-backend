import { UUID } from 'crypto';
import { PaymentStatusEnum } from './enums/payment-status.enum';
import { Booking } from 'src/bookings/booking.entity';
import { Voucher } from 'src/vouchers/voucher.entity';
export declare class Payment {
    id: UUID;
    fieldPrice: number;
    servicePrice?: number;
    voucher?: Voucher;
    discount?: number;
    status: PaymentStatusEnum;
    booking: Booking;
}

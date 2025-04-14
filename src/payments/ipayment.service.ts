import { Booking } from 'src/bookings/booking.entity';
import { Payment } from './payment.entity';
import { EntityManager } from 'typeorm';
import { UUID } from 'crypto';
import { PaymentDto } from './dtos/requests/payment.dto';
import { Request } from 'express';

export interface IPaymentService {
  createWithTransaction(
    fieldPrice: number,
    booking: Booking,
    manager: EntityManager,
  ): Promise<Payment>;

  payment(
    paymentId: UUID,
    paymentDto: PaymentDto,
    playerId: UUID,
    req: Request,
  ): Promise<any>;

  ipn(req: Request): Promise<{ message: string }>;
}

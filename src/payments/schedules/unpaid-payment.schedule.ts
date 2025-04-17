import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Payment } from '../payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UnpaidPaymentSchedule {
  constructor(
    /**
     * inject PaymentRepository
     */
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  public async unpaidSchedule() {}
}

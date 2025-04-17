import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { Payment } from '../payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PaymentStatusEnum } from '../enums/payment-status.enum';

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
  public async unpaidSchedule() {
    const tenMinutes = new Date(Date.now() - 10 * 60 * 1000);

    const expiredUnpaid = await this.paymentRepository.find({
      where: {
        status: PaymentStatusEnum.UNPAID,
        updatedAt: LessThan(tenMinutes),
      },
    });

    for (const payment of expiredUnpaid) {
      payment.status = PaymentStatusEnum.CANCELLED;
      try {
        await this.paymentRepository.save(payment);
      } catch {
        throw new InternalServerErrorException(
          'An error occurred when unpaid schedule',
        );
      }
    }
  }
}

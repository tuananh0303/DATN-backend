import { forwardRef, Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { PaymentController } from './payment.controller';
import { VoucherModule } from 'src/vouchers/voucher.module';
import { VnpayProvider } from './providers/vnpay.provider';
import { ServiceModule } from 'src/services/service.module';
import { UnpaidPaymentSchedule } from './schedules/unpaid-payment.schedule';
@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    VoucherModule,
    forwardRef(() => ServiceModule),
  ],
  providers: [PaymentService, VnpayProvider, UnpaidPaymentSchedule],
  exports: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}

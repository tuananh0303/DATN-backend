import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { PaymentController } from './payment.controller';
import { VoucherModule } from 'src/vouchers/voucher.module';
import { VnpayProvider } from './providers/vnpay.provider';
@Module({
  imports: [TypeOrmModule.forFeature([Payment]), VoucherModule],
  providers: [PaymentService, VnpayProvider],
  exports: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Payment } from '../payment.entity';
import {
  dateFormat,
  HashAlgorithm,
  ProductCode,
  ReturnQueryFromVNPay,
  VerifyReturnUrl,
  VNPay,
  VnpLocale,
} from 'vnpay';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { PaymentStatusEnum } from '../enums/payment-status.enum';

@Injectable()
export class VnpayProvider {
  constructor(
    /**
     * inject ConfigService
     */
    private readonly configService: ConfigService,
    /**
     * inject PaymentRepository
     */
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  public payment(payment: Payment, req: Request): { paymentUrl: string } {
    console.log('q2113');

    const vnpay = new VNPay({
      tmnCode: this.configService.get<string>('TMN_CODE')!,
      secureSecret: this.configService.get<string>('SECURE_SECRET')!,
      vnpayHost: 'https://sandbox.vnpayment.vn',
      testMode: true, // tùy chọn, ghi đè vnpayHost thành sandbox nếu là true
      hashAlgorithm: HashAlgorithm.SHA512, // tùy chọn
    });

    const totalPrice =
      payment.fieldPrice +
      (payment.servicePrice ? payment.servicePrice : 0) -
      (payment.discount ? payment.discount : 0);

    const paymentUrl = vnpay.buildPaymentUrl({
      vnp_Amount: totalPrice,
      vnp_IpAddr: `${
        (req.headers['x-forwarded-for'] ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          req.ip) as string
      }`,
      vnp_TxnRef: payment.id,
      vnp_OrderInfo: `Thanh toan don hang ${payment.id}`,
      vnp_OrderType: ProductCode.Other,
      vnp_ExpireDate: dateFormat(new Date(Date.now() + 15 * 60 * 1000)),
      vnp_ReturnUrl:
        this.configService.get<string>('VNPAY_RETURN_URL') ||
        'http://localhost:3000/payment/inp',
      vnp_Locale: VnpLocale.VN,
    });

    return {
      paymentUrl,
    };
  }

  public async ipn(req: Request): Promise<{ message: string }> {
    const vnpay = new VNPay({
      tmnCode: this.configService.get<string>('TMN_CODE')!,
      secureSecret: this.configService.get<string>('SECURE_SECRET')!,
      vnpayHost: 'https://sandbox.vnpayment.vn',
      testMode: true, // tùy chọn, ghi đè vnpayHost thành sandbox nếu là true
      hashAlgorithm: HashAlgorithm.SHA512, // tùy chọn
    });

    console.log('req: ', req);

    const verify: VerifyReturnUrl = vnpay.verifyIpnCall(
      req.query as ReturnQueryFromVNPay,
    );

    if (!verify.isVerified) {
      throw new BadRequestException('Invalid request');
    }

    const payment = await this.paymentRepository
      .findOneOrFail({
        where: {
          id: verify.vnp_TxnRef as UUID,
        },
      })
      .catch(() => {
        throw new NotFoundException(
          `Not found payment by id: ${verify.vnp_TxnRef}`,
        );
      });

    if (!verify.isSuccess) {
      payment.status = PaymentStatusEnum.CANCELLED;

      await this.paymentRepository.save(payment);

      throw new BadRequestException('Payment failed');
    }

    payment.status = PaymentStatusEnum.PAID;

    await this.paymentRepository.save(payment);

    return {
      message: 'Payment successful',
    };
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IPaymentService } from './ipayment.service';
import { Booking } from 'src/bookings/booking.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { UUID } from 'crypto';
import { PaymentDto } from './dtos/requests/payment.dto';
import { VoucherService } from 'src/vouchers/voucher.service';
import { PaymentStatusEnum } from './enums/payment-status.enum';
import { VoucherTypeEnum } from 'src/vouchers/enums/voucher-type.enum';
import { VnpayProvider } from './providers/vnpay.provider';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingStatusEnum } from 'src/bookings/enums/booking-status.enum';

@Injectable()
export class PaymentService implements IPaymentService {
  constructor(
    /**
     * inject paymentRepository
     */
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    /**
     * inject VoucherService
     */
    private readonly voucherService: VoucherService,
    /**
     * inject DataSource
     */
    private readonly dataSource: DataSource,
    /**
     * inject VnpayProvier
     */
    private readonly vnpayProvider: VnpayProvider,
  ) {}

  public async createWithTransaction(
    fieldPrice: number,
    booking: Booking,
    manager: EntityManager,
  ): Promise<Payment> {
    const payment = manager.create(Payment, {
      fieldPrice,
      booking,
    });

    return await manager.save(payment);
  }

  public async payment(
    paymentId: UUID,
    paymentDto: PaymentDto,
    playerId: UUID,
    req: Request,
  ): Promise<{ paymentUrl: string }> {
    // get payment
    const payment = await this.paymentRepository
      .findOneOrFail({
        relations: {
          booking: {
            bookingSlots: {
              field: {
                fieldGroup: {
                  facility: true,
                },
              },
            },
          },
        },
        where: {
          id: paymentId,
          booking: {
            player: {
              id: playerId,
            },
          },
        },
      })
      .catch(() => {
        throw new NotFoundException(
          `Not found the payment by id: ${paymentId}`,
        );
      });

    if (payment.status !== PaymentStatusEnum.UNPAID) {
      throw new BadRequestException('An error occurred');
    }

    return await this.dataSource.transaction<{ paymentUrl: string }>(
      async (manager) => {
        if (paymentDto.voucherId) {
          const voucher = await this.voucherService.findOneById(
            paymentDto.voucherId,
            ['facility'],
          );

          if (
            voucher.facility.id !==
            payment.booking.bookingSlots[0].field.fieldGroup.facility.id
          ) {
            throw new BadRequestException(
              'The voucher not apply for this payment',
            );
          }

          const today = new Date();

          if (today < voucher.startDate) {
            throw new BadRequestException('Voucher has not started yet');
          }

          if (today > voucher.endDate) {
            throw new BadRequestException('Voucher has expired');
          }

          if (voucher.remain === 0) {
            throw new BadRequestException('Voucher is out of stock');
          }

          const totalPrice =
            payment.fieldPrice +
            (payment.servicePrice ? payment.servicePrice : 0);

          if (totalPrice < voucher.minPrice) {
            throw new BadRequestException(
              'Total price must be greater than min price of voucher',
            );
          }

          voucher.remain -= 1;

          await manager.save(voucher);

          if (voucher.voucherType === VoucherTypeEnum.CASH) {
            payment.discount = voucher.discount;
          } else if (voucher.voucherType === VoucherTypeEnum.PERCENT) {
            payment.discount = totalPrice * (voucher.discount / 100);
          }
        }

        await manager.save(payment);

        const booking = payment.booking;

        booking.status = BookingStatusEnum.COMPLETED;

        await manager.save(booking);

        // if(paymentDto.paymentOption ===)
        return this.vnpayProvider.payment(payment, req);
      },
    );
  }

  public async ipn(req: Request): Promise<{ message: string }> {
    return await this.vnpayProvider.ipn(req);
  }
}

import { Injectable } from '@nestjs/common';
import { IPaymentService } from './ipayment.service';

@Injectable()
export class PaymentService implements IPaymentService {}

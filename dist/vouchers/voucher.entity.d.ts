import { VoucherTypeEnum } from './enums/voucher-type.enum';
import { Facility } from 'src/facilities/facility.entity';
import { Payment } from 'src/payments/payment.entity';
export declare class Voucher {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    voucherType: VoucherTypeEnum;
    discount: number;
    minPrice: number;
    maxDiscount?: number;
    amount: number;
    remain: number;
    createdAt: Date;
    updatedAt: Date;
    facility: Facility;
    payments: Payment[];
    beforeInsert(): void;
    beforeInsertAnUpdate(): void;
    afterLoad(): void;
}

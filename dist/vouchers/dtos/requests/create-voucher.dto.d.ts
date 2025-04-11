import { VoucherTypeEnum } from '../../enums/voucher-type.enum';
export declare class CreateVoucherDto {
    name: string;
    startDate: Date;
    endDate: Date;
    voucherType: VoucherTypeEnum;
    discount: number;
    minPrice: number;
    maxDiscount?: number;
    amount: number;
}

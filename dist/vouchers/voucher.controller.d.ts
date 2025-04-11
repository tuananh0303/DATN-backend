import { VoucherService } from './voucher.service';
import { CreateVoucherDto } from './dtos/requests/create-voucher.dto';
import { UUID } from 'crypto';
import { UpdateVoucherDto } from './dtos/requests/update-voucher.dto';
export declare class VoucherController {
    private readonly voucherService;
    constructor(voucherService: VoucherService);
    create(createVoucherDto: CreateVoucherDto, facilityId: UUID, ownerId: UUID): Promise<{
        message: string;
    }>;
    delete(voucherId: number, ownerId: UUID): Promise<{
        message: string;
    }>;
    update(updateVoucherDto: UpdateVoucherDto, ownerID: UUID): Promise<{
        message: string;
    }>;
    getByFacility(facilityId: UUID): Promise<import("./voucher.entity").Voucher[]>;
}

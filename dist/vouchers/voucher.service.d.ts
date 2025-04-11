import { IVoucherService } from './ivoucher.service';
import { UUID } from 'crypto';
import { CreateVoucherDto } from './dtos/requests/create-voucher.dto';
import { Repository } from 'typeorm';
import { Voucher } from './voucher.entity';
import { FacilityService } from 'src/facilities/facility.service';
import { UpdateVoucherDto } from './dtos/requests/update-voucher.dto';
export declare class VoucherService implements IVoucherService {
    private readonly voucherRepository;
    private readonly facilityService;
    constructor(voucherRepository: Repository<Voucher>, facilityService: FacilityService);
    create(createVoucherDto: CreateVoucherDto, facilityId: UUID, ownerId: UUID): Promise<{
        message: string;
    }>;
    delete(voucherId: number, ownerId: UUID): Promise<{
        message: string;
    }>;
    findOneByIdAndOwner(voucherId: number, ownerId: UUID): Promise<Voucher>;
    update(updateVoucherDto: UpdateVoucherDto, ownerId: UUID): Promise<{
        message: string;
    }>;
    getByFacility(facilityId: UUID): Promise<Voucher[]>;
}

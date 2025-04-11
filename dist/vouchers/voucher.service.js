"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoucherService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const voucher_entity_1 = require("./voucher.entity");
const typeorm_2 = require("@nestjs/typeorm");
const facility_service_1 = require("../facilities/facility.service");
const voucher_type_enum_1 = require("./enums/voucher-type.enum");
let VoucherService = class VoucherService {
    voucherRepository;
    facilityService;
    constructor(voucherRepository, facilityService) {
        this.voucherRepository = voucherRepository;
        this.facilityService = facilityService;
    }
    async create(createVoucherDto, facilityId, ownerId) {
        if (createVoucherDto.voucherType === voucher_type_enum_1.VoucherTypeEnum.CASH) {
            createVoucherDto.maxDiscount = createVoucherDto.discount;
        }
        const facility = await this.facilityService.findOneByIdAndOwnerId(facilityId, ownerId);
        try {
            const voucher = this.voucherRepository.create({
                ...createVoucherDto,
                facility,
                remain: createVoucherDto.amount,
            });
            await this.voucherRepository.save(voucher);
        }
        catch {
            throw new common_1.BadRequestException('An error occurred when create the voucher');
        }
        return {
            message: 'Create voucher successful',
        };
    }
    async delete(voucherId, ownerId) {
        const voucher = await this.findOneByIdAndOwner(voucherId, ownerId);
        try {
            await this.voucherRepository.remove(voucher);
        }
        catch {
            throw new common_1.BadRequestException('An error occurred when delete the voucher');
        }
        return {
            message: 'Delete voucher successful',
        };
    }
    async findOneByIdAndOwner(voucherId, ownerId) {
        return this.voucherRepository
            .findOneOrFail({
            where: {
                id: voucherId,
                facility: {
                    owner: {
                        id: ownerId,
                    },
                },
            },
        })
            .catch(() => {
            throw new common_1.NotFoundException('Not found the voucher');
        });
    }
    async update(updateVoucherDto, ownerId) {
        const voucher = await this.findOneByIdAndOwner(updateVoucherDto.id, ownerId);
        if (updateVoucherDto.name)
            voucher.name = updateVoucherDto.name;
        if (updateVoucherDto.voucherType)
            voucher.voucherType = updateVoucherDto.voucherType;
        if (updateVoucherDto.amount) {
            const remain = voucher.remain + updateVoucherDto.amount - voucher.amount;
            voucher.amount = updateVoucherDto.amount;
            voucher.remain = remain;
        }
        if (updateVoucherDto.startDate)
            voucher.startDate = updateVoucherDto.startDate;
        if (updateVoucherDto.endDate)
            voucher.endDate = updateVoucherDto.endDate;
        if (updateVoucherDto.discount)
            voucher.discount = updateVoucherDto.discount;
        if (updateVoucherDto.minPrice)
            voucher.minPrice = updateVoucherDto.minPrice;
        if (updateVoucherDto.maxDiscount)
            voucher.maxDiscount = updateVoucherDto.maxDiscount;
        try {
            await this.voucherRepository.save(voucher);
        }
        catch {
            throw new common_1.BadRequestException('An error occurrd when update the voucher');
        }
        return {
            message: 'Update voucher successful',
        };
    }
    async getByFacility(facilityId) {
        return await this.voucherRepository.find({
            where: {
                facility: {
                    id: facilityId,
                },
            },
            order: {
                endDate: 'DESC',
            },
        });
    }
};
exports.VoucherService = VoucherService;
exports.VoucherService = VoucherService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(voucher_entity_1.Voucher)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        facility_service_1.FacilityService])
], VoucherService);
//# sourceMappingURL=voucher.service.js.map
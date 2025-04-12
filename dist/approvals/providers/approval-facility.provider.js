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
exports.ApprovalFacilityProvider = void 0;
const common_1 = require("@nestjs/common");
const approval_entity_1 = require("../approval.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const facility_service_1 = require("../../facilities/facility.service");
const approval_status_enum_1 = require("../enums/approval-status.enum");
const approval_type_enum_1 = require("../enums/approval-type.enum");
const facility_status_enum_1 = require("../../facilities/enums/facility-status.enum");
let ApprovalFacilityProvider = class ApprovalFacilityProvider {
    approveRepository;
    facilityService;
    dataSource;
    constructor(approveRepository, facilityService, dataSource) {
        this.approveRepository = approveRepository;
        this.facilityService = facilityService;
        this.dataSource = dataSource;
    }
    async createWithTransaction(facilityId, createApprovalDto, manager) {
        const facility = await this.facilityService.findOneByIdWithTransaction(facilityId, manager);
        const approve = manager.create(approval_entity_1.Approval, {
            type: approval_type_enum_1.ApprovalTypeEnum.FACILITY,
            facility,
        });
        return await manager.save(approve);
    }
    async approve(approve) {
        await this.dataSource.transaction(async (manager) => {
            approve.status = approval_status_enum_1.ApprovalStatusEnum.APPROVED;
            const facility = await this.facilityService.findOneByIdWithTransaction(approve.facility.id, manager);
            if (facility.status !== facility_status_enum_1.FacilityStatusEnum.PENDING) {
                throw new common_1.BadRequestException('The facility status must be pending');
            }
            facility.status = facility_status_enum_1.FacilityStatusEnum.ACTIVE;
            try {
                await manager.save(approve);
                await manager.save(facility);
            }
            catch {
                throw new common_1.BadRequestException('An error occurred when approve the facility');
            }
        });
        return {
            message: 'Approve the facility successful',
        };
    }
    async reject(approval, rejectNoteDto) {
        await this.dataSource.transaction(async (manager) => {
            approval.status = approval_status_enum_1.ApprovalStatusEnum.REJECTED;
            if (rejectNoteDto.note) {
                approval.note = rejectNoteDto.note;
            }
            const facility = await this.facilityService.findOneByIdWithTransaction(approval.facility.id, manager);
            if (facility.status !== facility_status_enum_1.FacilityStatusEnum.PENDING) {
                throw new common_1.BadRequestException('The facility status must be pending');
            }
            facility.status = facility_status_enum_1.FacilityStatusEnum.UNACTIVE;
            try {
                await manager.save(approval);
                await manager.save(facility);
            }
            catch {
                throw new common_1.BadRequestException('An error occurred when reject the facility');
            }
        });
        return {
            message: 'Reject the facility successful',
        };
    }
};
exports.ApprovalFacilityProvider = ApprovalFacilityProvider;
exports.ApprovalFacilityProvider = ApprovalFacilityProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(approval_entity_1.Approval)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => facility_service_1.FacilityService))),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        facility_service_1.FacilityService,
        typeorm_1.DataSource])
], ApprovalFacilityProvider);
//# sourceMappingURL=approval-facility.provider.js.map
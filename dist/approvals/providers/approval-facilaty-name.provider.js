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
exports.ApprovalFacilityNameProvider = void 0;
const common_1 = require("@nestjs/common");
const approval_entity_1 = require("../approval.entity");
const typeorm_1 = require("typeorm");
const approval_type_enum_1 = require("../enums/approval-type.enum");
const approval_status_enum_1 = require("../enums/approval-status.enum");
const typeorm_2 = require("@nestjs/typeorm");
const facility_service_1 = require("../../facilities/facility.service");
const certificate_entity_1 = require("../../certificates/certificate.entity");
let ApprovalFacilityNameProvider = class ApprovalFacilityNameProvider {
    facilityService;
    dataSource;
    approvalRepository;
    constructor(facilityService, dataSource, approvalRepository) {
        this.facilityService = facilityService;
        this.dataSource = dataSource;
        this.approvalRepository = approvalRepository;
    }
    async createWithTransaction(facilityId, createApprovalDto, manager) {
        const facility = await this.facilityService.findOneByIdWithTransaction(facilityId, manager);
        const approval = manager.create(approval_entity_1.Approval, {
            facility,
            type: approval_type_enum_1.ApprovalTypeEnum.FACILITY_NAME,
            certifiacte: createApprovalDto.certificate,
            name: createApprovalDto.name,
        });
        return await manager.save(approval);
    }
    async approve(approval) {
        await this.dataSource.transaction(async (manager) => {
            approval.status = approval_status_enum_1.ApprovalStatusEnum.APPROVED;
            const facility = await this.facilityService.findOneByIdWithTransaction(approval.facility.id, manager);
            facility.name = approval.name;
            const certifiacte = await manager
                .findOneOrFail(certificate_entity_1.Certificate, {
                where: {
                    facilityId: facility.id,
                },
            })
                .catch(() => {
                throw new common_1.BadRequestException('An error occurred');
            });
            certifiacte.verified = approval.certifiacte;
            try {
                await manager.save(approval);
                await manager.save(facility);
                await manager.save(certifiacte);
            }
            catch {
                throw new common_1.BadRequestException('An error occurred');
            }
        });
        return {
            message: 'Approve the facility name successful',
        };
    }
    async reject(approval, rejectNoteDto) {
        approval.status = approval_status_enum_1.ApprovalStatusEnum.REJECTED;
        if (rejectNoteDto.note) {
            approval.note = rejectNoteDto.note;
        }
        await this.approvalRepository.save(approval);
        return {
            message: 'Reject the facility successful',
        };
    }
};
exports.ApprovalFacilityNameProvider = ApprovalFacilityNameProvider;
exports.ApprovalFacilityNameProvider = ApprovalFacilityNameProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => facility_service_1.FacilityService))),
    __param(2, (0, typeorm_2.InjectRepository)(approval_entity_1.Approval)),
    __metadata("design:paramtypes", [facility_service_1.FacilityService,
        typeorm_1.DataSource,
        typeorm_1.Repository])
], ApprovalFacilityNameProvider);
//# sourceMappingURL=approval-facilaty-name.provider.js.map
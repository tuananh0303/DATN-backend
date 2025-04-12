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
exports.ApprovalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const approval_facility_provider_1 = require("./providers/approval-facility.provider");
const approval_facility_name_provider_1 = require("./providers/approval-facility-name.provider");
const approval_certificate_provider_1 = require("./providers/approval-certificate.provider");
const approval_license_provider_1 = require("./providers/approval-license.provider");
const approval_type_enum_1 = require("./enums/approval-type.enum");
const approval_status_enum_1 = require("./enums/approval-status.enum");
const approval_entity_1 = require("./approval.entity");
const facility_status_enum_1 = require("../facilities/enums/facility-status.enum");
let ApprovalService = class ApprovalService {
    approveRepository;
    approvalFacilityProvider;
    approvalFacilityNameProvider;
    approvalCertificateProvider;
    approvalLicenseProvider;
    constructor(approveRepository, approvalFacilityProvider, approvalFacilityNameProvider, approvalCertificateProvider, approvalLicenseProvider) {
        this.approveRepository = approveRepository;
        this.approvalFacilityProvider = approvalFacilityProvider;
        this.approvalFacilityNameProvider = approvalFacilityNameProvider;
        this.approvalCertificateProvider = approvalCertificateProvider;
        this.approvalLicenseProvider = approvalLicenseProvider;
    }
    async createWithTransaction(facilityId, approvalType, createApprovalDto, manager) {
        switch (approvalType) {
            case approval_type_enum_1.ApprovalTypeEnum.FACILITY:
                return await this.approvalFacilityProvider.createWithTransaction(facilityId, createApprovalDto, manager);
            case approval_type_enum_1.ApprovalTypeEnum.FACILITY_NAME:
                return await this.approvalFacilityNameProvider.createWithTransaction(facilityId, createApprovalDto, manager);
            case approval_type_enum_1.ApprovalTypeEnum.CERTIFICATE:
                return await this.approvalCertificateProvider.createWithTransaction(facilityId, createApprovalDto, manager);
            case approval_type_enum_1.ApprovalTypeEnum.LICENSE:
                return await this.approvalLicenseProvider.createWithTransaction(facilityId, createApprovalDto, manager);
            default:
                throw new common_1.BadRequestException('An error occurred');
        }
    }
    async approve(approvalId) {
        const approval = await this.findOneById(approvalId);
        if (approval.status !== approval_status_enum_1.ApprovalStatusEnum.PENDING) {
            throw new common_1.BadRequestException('Approval must be pendding');
        }
        switch (approval.type) {
            case approval_type_enum_1.ApprovalTypeEnum.FACILITY:
                return await this.approvalFacilityProvider.approve(approval);
            case approval_type_enum_1.ApprovalTypeEnum.FACILITY_NAME:
                if (approval.facility.status !== facility_status_enum_1.FacilityStatusEnum.ACTIVE) {
                    throw new common_1.BadRequestException('The facility must be active');
                }
                return await this.approvalFacilityNameProvider.approve(approval);
            case approval_type_enum_1.ApprovalTypeEnum.CERTIFICATE:
                if (approval.facility.status !== facility_status_enum_1.FacilityStatusEnum.ACTIVE) {
                    throw new common_1.BadRequestException('The facility must be active');
                }
                return await this.approvalCertificateProvider.approve(approval);
            case approval_type_enum_1.ApprovalTypeEnum.LICENSE:
                if (approval.facility.status !== facility_status_enum_1.FacilityStatusEnum.ACTIVE) {
                    throw new common_1.BadRequestException('The facility must be active');
                }
                return await this.approvalLicenseProvider.approve(approval);
            default:
                throw new common_1.BadRequestException('An error occurred');
        }
    }
    async reject(approvalId, rejectNoteDto) {
        const approval = await this.findOneById(approvalId);
        if (approval.status !== approval_status_enum_1.ApprovalStatusEnum.PENDING) {
            throw new common_1.BadRequestException('approval must be pendding');
        }
        switch (approval.type) {
            case approval_type_enum_1.ApprovalTypeEnum.FACILITY:
                return await this.approvalFacilityProvider.reject(approval, rejectNoteDto);
            case approval_type_enum_1.ApprovalTypeEnum.FACILITY_NAME:
                if (approval.facility.status !== facility_status_enum_1.FacilityStatusEnum.ACTIVE) {
                    throw new common_1.BadRequestException('The facility must be active');
                }
                return await this.approvalFacilityNameProvider.reject(approval, rejectNoteDto);
            case approval_type_enum_1.ApprovalTypeEnum.CERTIFICATE:
                if (approval.facility.status !== facility_status_enum_1.FacilityStatusEnum.ACTIVE) {
                    throw new common_1.BadRequestException('The facility must be active');
                }
                return await this.approvalCertificateProvider.reject(approval, rejectNoteDto);
            case approval_type_enum_1.ApprovalTypeEnum.LICENSE:
                if (approval.facility.status !== facility_status_enum_1.FacilityStatusEnum.ACTIVE) {
                    throw new common_1.BadRequestException('The facility must be active');
                }
                return await this.approvalLicenseProvider.reject(approval, rejectNoteDto);
            default:
                throw new common_1.BadRequestException('An error occurred');
        }
    }
    async findOneById(approveId) {
        return await this.approveRepository
            .findOneOrFail({
            relations: {
                facility: true,
                sport: true,
            },
            where: {
                id: approveId,
            },
        })
            .catch(() => {
            throw new common_1.NotFoundException('Not found the approve');
        });
    }
    async getAll() {
        return this.approveRepository.find({
            relations: {
                facility: {
                    certificate: true,
                    licenses: true,
                },
                sport: true,
            },
        });
    }
    async delete(approvalId, ownerId) {
        const approval = await this.approveRepository
            .findOneOrFail({
            where: {
                id: approvalId,
                facility: {
                    owner: {
                        id: ownerId,
                    },
                },
            },
        })
            .catch(() => {
            throw new common_1.NotFoundException('Not found the approval');
        });
        if (approval.status !== approval_status_enum_1.ApprovalStatusEnum.PENDING) {
            throw new common_1.BadRequestException('The approval must be pending');
        }
        await this.approveRepository.remove(approval);
        return {
            message: 'Delete the approval successful',
        };
    }
};
exports.ApprovalService = ApprovalService;
exports.ApprovalService = ApprovalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(approval_entity_1.Approval)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        approval_facility_provider_1.ApprovalFacilityProvider,
        approval_facility_name_provider_1.ApprovalFacilityNameProvider,
        approval_certificate_provider_1.ApprovalCertificateProvider,
        approval_license_provider_1.ApprovalLicenseProvider])
], ApprovalService);
//# sourceMappingURL=approval.service.js.map
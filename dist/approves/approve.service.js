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
exports.ApproveService = void 0;
const common_1 = require("@nestjs/common");
const approve_entity_1 = require("./approve.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const approve_facility_provider_1 = require("./providers/approve-facility.provider");
const approve_facilaty_name_provider_1 = require("./providers/approve-facilaty-name.provider");
const approve_certificate_provider_1 = require("./providers/approve-certificate.provider");
const approvce_license_provider_1 = require("./providers/approvce-license.provider");
const approve_type_enum_1 = require("./enums/approve-type.enum");
const approve_status_enum_1 = require("./enums/approve-status.enum");
let ApproveService = class ApproveService {
    approveRepository;
    approveFacilityProvider;
    approveFacilityNameProvider;
    approveCertificateProvider;
    approveLicenseProvider;
    constructor(approveRepository, approveFacilityProvider, approveFacilityNameProvider, approveCertificateProvider, approveLicenseProvider) {
        this.approveRepository = approveRepository;
        this.approveFacilityProvider = approveFacilityProvider;
        this.approveFacilityNameProvider = approveFacilityNameProvider;
        this.approveCertificateProvider = approveCertificateProvider;
        this.approveLicenseProvider = approveLicenseProvider;
    }
    async create(facilityId, createApproveDto) {
        console.log('--------------------');
        switch (createApproveDto.type) {
            case approve_type_enum_1.ApproveTypeEnum.FACILITY:
                return await this.approveFacilityProvider.create(facilityId, createApproveDto);
            case approve_type_enum_1.ApproveTypeEnum.FACILITY_NAME:
                return await this.approveFacilityNameProvider.create(facilityId, createApproveDto);
            case approve_type_enum_1.ApproveTypeEnum.CERTIFICATE:
                return await this.approveCertificateProvider.create(facilityId, createApproveDto);
            case approve_type_enum_1.ApproveTypeEnum.LICENSE:
                return await this.approveLicenseProvider.create(facilityId, createApproveDto);
            default:
                throw new common_1.BadRequestException('An error occurred');
        }
    }
    async approve(approveId) {
        const approve = await this.findOneById(approveId);
        if (approve.status !== approve_status_enum_1.ApproveStatusEnum.PENDING) {
            throw new common_1.BadRequestException('approval must be pendding');
        }
        switch (approve.type) {
            case approve_type_enum_1.ApproveTypeEnum.FACILITY:
                return await this.approveFacilityProvider.approve(approve);
            case approve_type_enum_1.ApproveTypeEnum.FACILITY_NAME:
                return await this.approveFacilityNameProvider.approve(approve);
            case approve_type_enum_1.ApproveTypeEnum.CERTIFICATE:
                return await this.approveCertificateProvider.approve(approve);
            case approve_type_enum_1.ApproveTypeEnum.LICENSE:
                return await this.approveLicenseProvider.approve(approve);
            default:
                throw new common_1.BadRequestException('An error occurred');
        }
    }
    async reject(approveId, rejectNoteDto) {
        const approve = await this.findOneById(approveId);
        if (approve.status !== approve_status_enum_1.ApproveStatusEnum.PENDING) {
            throw new common_1.BadRequestException('approval must be pendding');
        }
        switch (approve.type) {
            case approve_type_enum_1.ApproveTypeEnum.FACILITY:
                return await this.approveFacilityProvider.reject(approve, rejectNoteDto);
            case approve_type_enum_1.ApproveTypeEnum.FACILITY_NAME:
                return await this.approveFacilityNameProvider.reject(approve, rejectNoteDto);
            case approve_type_enum_1.ApproveTypeEnum.CERTIFICATE:
                return await this.approveCertificateProvider.reject(approve, rejectNoteDto);
            case approve_type_enum_1.ApproveTypeEnum.LICENSE:
                return await this.approveLicenseProvider.reject(approve, rejectNoteDto);
            default:
                throw new common_1.BadRequestException('An error occurred');
        }
    }
    async findOneById(approveId) {
        return await this.approveRepository
            .findOneOrFail({
            relations: {
                facility: true,
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
            },
        });
    }
};
exports.ApproveService = ApproveService;
exports.ApproveService = ApproveService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(approve_entity_1.Approve)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        approve_facility_provider_1.ApproveFacilityProvider,
        approve_facilaty_name_provider_1.ApproveFacilityNameProvider,
        approve_certificate_provider_1.ApproveCertificateProvider,
        approvce_license_provider_1.ApproveLicenseProvider])
], ApproveService);
//# sourceMappingURL=approve.service.js.map
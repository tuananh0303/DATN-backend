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
exports.ApprovalLicenseProvider = void 0;
const approval_entity_1 = require("../approval.entity");
const typeorm_1 = require("typeorm");
const sport_service_1 = require("../../sports/sport.service");
const facility_service_1 = require("../../facilities/facility.service");
const approval_status_enum_1 = require("../enums/approval-status.enum");
const license_entity_1 = require("../../licenses/license.entity");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const approval_type_enum_1 = require("../enums/approval-type.enum");
const license_service_1 = require("../../licenses/license.service");
let ApprovalLicenseProvider = class ApprovalLicenseProvider {
    sportService;
    facilityService;
    dataSource;
    approvalRepository;
    licenseService;
    constructor(sportService, facilityService, dataSource, approvalRepository, licenseService) {
        this.sportService = sportService;
        this.facilityService = facilityService;
        this.dataSource = dataSource;
        this.approvalRepository = approvalRepository;
        this.licenseService = licenseService;
    }
    async createWithTransaction(facilityId, createApprovalDto, manager) {
        const facility = await this.facilityService.findOneByIdWithTransaction(facilityId, manager);
        const sport = await this.sportService.findOneByIdWithTransaction(createApprovalDto.sportId, manager);
        const approval = manager.create(approval_entity_1.Approval, {
            facility,
            sport,
            type: approval_type_enum_1.ApprovalTypeEnum.LICENSE,
            license: createApprovalDto.license,
        });
        return await manager.save(approval);
    }
    async approve(approval) {
        await this.dataSource.transaction(async (manager) => {
            approval.status = approval_status_enum_1.ApprovalStatusEnum.APPROVED;
            let license = await manager.findOne(license_entity_1.License, {
                where: {
                    facilityId: approval.facility.id,
                    sportId: approval.sport?.id,
                },
            });
            if (!license) {
                license = await this.licenseService.createNoUploadWithTransction(approval.license, approval.facility, approval.sport.id, manager);
            }
            else {
                license.verified = approval.license;
            }
            try {
                await manager.save(approval);
                await manager.save(license);
            }
            catch {
                throw new common_1.BadRequestException('An error occurred');
            }
        });
        return {
            message: 'Approve the license of facility successful',
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
exports.ApprovalLicenseProvider = ApprovalLicenseProvider;
exports.ApprovalLicenseProvider = ApprovalLicenseProvider = __decorate([
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => facility_service_1.FacilityService))),
    __param(3, (0, typeorm_2.InjectRepository)(approval_entity_1.Approval)),
    __metadata("design:paramtypes", [sport_service_1.SportService,
        facility_service_1.FacilityService,
        typeorm_1.DataSource,
        typeorm_1.Repository,
        license_service_1.LicenseService])
], ApprovalLicenseProvider);
//# sourceMappingURL=approval-license.provider.js.map
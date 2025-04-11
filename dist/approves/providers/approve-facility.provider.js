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
exports.ApproveFacilityProvider = void 0;
const common_1 = require("@nestjs/common");
const approve_entity_1 = require("../approve.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const facility_service_1 = require("../../facilities/facility.service");
const approve_status_enum_1 = require("../enums/approve-status.enum");
let ApproveFacilityProvider = class ApproveFacilityProvider {
    approveRepository;
    facilityService;
    constructor(approveRepository, facilityService) {
        this.approveRepository = approveRepository;
        this.facilityService = facilityService;
    }
    async create(facilityId, createApproveDto) {
        const facility = await this.facilityService.findOneById(facilityId);
        console.log(facility);
        const approve = this.approveRepository.create({
            type: createApproveDto.type,
            facility,
        });
        return await this.approveRepository.save(approve);
    }
    async approve(approve) {
        approve.status = approve_status_enum_1.ApproveStatusEnum.APPROVED;
        await this.facilityService.approve(approve.facility);
        try {
            await this.approveRepository.save(approve);
        }
        catch {
            throw new common_1.BadRequestException('An error occurred when approve the facility');
        }
        return {
            message: 'Approve the facility successful',
        };
    }
    async reject(approve, rejectNoteDto) {
        approve.status = approve_status_enum_1.ApproveStatusEnum.REJECTED;
        if (rejectNoteDto.note) {
            approve.note = rejectNoteDto.note;
        }
        await this.facilityService.reject(approve.facility);
        try {
            await this.approveRepository.save(approve);
        }
        catch {
            throw new common_1.BadRequestException('An error occurred when reject the facility');
        }
        return {
            message: 'Reject the facility successful',
        };
    }
};
exports.ApproveFacilityProvider = ApproveFacilityProvider;
exports.ApproveFacilityProvider = ApproveFacilityProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(approve_entity_1.Approve)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => facility_service_1.FacilityService))),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        facility_service_1.FacilityService])
], ApproveFacilityProvider);
//# sourceMappingURL=approve-facility.provider.js.map
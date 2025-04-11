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
exports.FieldGroupService = void 0;
const common_1 = require("@nestjs/common");
const field_group_entity_1 = require("./field-group.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const field_service_1 = require("../fields/field.service");
const facility_service_1 = require("../facilities/facility.service");
const sport_entity_1 = require("../sports/sport.entity");
const sport_service_1 = require("../sports/sport.service");
let FieldGroupService = class FieldGroupService {
    fieldGroupRepository;
    fieldService;
    facilityService;
    dataSource;
    sportService;
    constructor(fieldGroupRepository, fieldService, facilityService, dataSource, sportService) {
        this.fieldGroupRepository = fieldGroupRepository;
        this.fieldService = fieldService;
        this.facilityService = facilityService;
        this.dataSource = dataSource;
        this.sportService = sportService;
    }
    async findOneByIdAndOwnerId(fieldGroupId, ownerId) {
        return await this.fieldGroupRepository
            .findOneOrFail({
            where: {
                id: fieldGroupId,
                facility: {
                    owner: {
                        id: ownerId,
                    },
                },
            },
        })
            .catch(() => {
            throw new common_1.NotFoundException(`Not found field group with id: ${fieldGroupId} of owner: ${ownerId} `);
        });
    }
    async createMany(createManyFieldGroupsDto, facilityId, ownerId) {
        const facility = await this.facilityService.findOneByIdAndOwnerId(facilityId, ownerId);
        await this.dataSource.transaction(async (manager) => {
            for (const fieldGroup of createManyFieldGroupsDto.fieldGroups) {
                await this.createWithTransaction(fieldGroup, facility, manager);
            }
        });
        return {
            message: 'Create many field groups successful',
        };
    }
    async createWithTransaction(createFieldGroupDto, facility, manager) {
        const sports = await manager.find(sport_entity_1.Sport, {
            where: {
                id: (0, typeorm_1.In)(createFieldGroupDto.sportIds),
            },
        });
        const fieldGroup = manager.create(field_group_entity_1.FieldGroup, {
            ...createFieldGroupDto,
            facility,
            sports,
        });
        await manager.save(fieldGroup);
        for (const field of createFieldGroupDto.fields) {
            await this.fieldService.createWithTransaction(field, fieldGroup, manager);
        }
        return fieldGroup;
    }
    async update(updateFieldGroupDto, fieldGroupId, ownerId) {
        const fieldGroup = await this.findOneByIdAndOwnerId(fieldGroupId, ownerId);
        if (updateFieldGroupDto.name)
            fieldGroup.name = updateFieldGroupDto.name;
        if (updateFieldGroupDto.dimension)
            fieldGroup.dimension = updateFieldGroupDto.dimension;
        if (updateFieldGroupDto.surface)
            fieldGroup.surface = updateFieldGroupDto.surface;
        if (updateFieldGroupDto.basePrice)
            fieldGroup.basePrice = updateFieldGroupDto.basePrice;
        if (updateFieldGroupDto.peakEndTime1)
            fieldGroup.peakEndTime1 = updateFieldGroupDto.peakEndTime1;
        if (updateFieldGroupDto.peakStartTime1)
            fieldGroup.peakStartTime1 = updateFieldGroupDto.peakStartTime1;
        if (updateFieldGroupDto.priceIncrease1)
            fieldGroup.priceIncrease1 = updateFieldGroupDto.priceIncrease1;
        if (updateFieldGroupDto.peakEndTime2)
            fieldGroup.peakEndTime2 = updateFieldGroupDto.peakEndTime2;
        if (updateFieldGroupDto.peakStartTime2)
            fieldGroup.peakStartTime2 = updateFieldGroupDto.peakStartTime2;
        if (updateFieldGroupDto.priceIncrease2)
            fieldGroup.priceIncrease2 = updateFieldGroupDto.priceIncrease2;
        if (updateFieldGroupDto.peakEndTime3)
            fieldGroup.peakEndTime3 = updateFieldGroupDto.peakEndTime3;
        if (updateFieldGroupDto.peakStartTime3)
            fieldGroup.peakStartTime3 = updateFieldGroupDto.peakStartTime3;
        if (updateFieldGroupDto.priceIncrease3)
            fieldGroup.priceIncrease3 = updateFieldGroupDto.priceIncrease3;
        if (updateFieldGroupDto.sportIds) {
            const sports = await this.sportService.findManyByIds(updateFieldGroupDto.sportIds);
            fieldGroup.sports = sports;
        }
        try {
            await this.fieldGroupRepository.save(fieldGroup);
        }
        catch {
            throw new common_1.BadRequestException('An error occurred when update field group');
        }
        return {
            message: 'Update field group successful',
        };
    }
    async delete(fieldGroupId, ownerId) {
        const fieldGroup = await this.findOneByIdAndOwnerId(fieldGroupId, ownerId);
        try {
            await this.fieldGroupRepository.remove(fieldGroup);
        }
        catch {
            throw new common_1.BadRequestException('An error occurred when delete field group');
        }
        return {
            message: 'Delete field group successful',
        };
    }
    async getByFacilityId(facilityId) {
        return await this.fieldGroupRepository.find({
            relations: {
                fields: true,
                sports: true,
            },
            where: {
                facility: {
                    id: facilityId,
                },
            },
        });
    }
};
exports.FieldGroupService = FieldGroupService;
exports.FieldGroupService = FieldGroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(field_group_entity_1.FieldGroup)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => field_service_1.FieldService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => facility_service_1.FacilityService))),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        field_service_1.FieldService,
        facility_service_1.FacilityService,
        typeorm_1.DataSource,
        sport_service_1.SportService])
], FieldGroupService);
//# sourceMappingURL=field-group.service.js.map
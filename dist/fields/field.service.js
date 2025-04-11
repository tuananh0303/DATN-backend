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
exports.FieldService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const field_entity_1 = require("./field.entity");
const typeorm_2 = require("@nestjs/typeorm");
const field_group_service_1 = require("../field-groups/field-group.service");
let FieldService = class FieldService {
    fieldRepositoy;
    fieldGroupService;
    dataSource;
    constructor(fieldRepositoy, fieldGroupService, dataSource) {
        this.fieldRepositoy = fieldRepositoy;
        this.fieldGroupService = fieldGroupService;
        this.dataSource = dataSource;
    }
    async findOneById(fieldId, relations) {
        return await this.fieldRepositoy
            .findOneOrFail({
            relations,
            where: {
                id: fieldId,
            },
        })
            .catch(() => {
            throw new common_1.NotFoundException(`Not found the field id: ${fieldId}`);
        });
    }
    async createMany(createManyFieldsDto, fieldGroupId, ownerId) {
        const fieldGroup = await this.fieldGroupService.findOneByIdAndOwnerId(fieldGroupId, ownerId);
        await this.dataSource.transaction(async (manager) => {
            for (const field of createManyFieldsDto.fields) {
                await this.createWithTransaction(field, fieldGroup, manager);
            }
        });
        return {
            message: 'Craete many fields successful',
        };
    }
    async createWithTransaction(createFieldDto, fieldGroup, manager) {
        const field = manager.create(field_entity_1.Field, {
            ...createFieldDto,
            fieldGroup,
        });
        return await manager.save(field);
    }
    async findOneByIdAndOnwerId(id, ownerId) {
        return await this.fieldRepositoy
            .findOneOrFail({
            where: {
                id,
                fieldGroup: {
                    facility: {
                        owner: {
                            id: ownerId,
                        },
                    },
                },
            },
        })
            .catch(() => {
            throw new common_1.NotFoundException(`Not found field with id: ${id} of owner: ${ownerId}`);
        });
    }
    async update(updateFieldDto, ownerId) {
        const field = await this.findOneByIdAndOnwerId(updateFieldDto.id, ownerId);
        if (updateFieldDto.name)
            field.name = updateFieldDto.name;
        try {
            await this.fieldRepositoy.save(field);
        }
        catch {
            throw new common_1.BadRequestException('Error occurred when update field');
        }
        return {
            message: 'Update field successful',
        };
    }
    async delete(fieldId, ownerId) {
        const field = await this.findOneByIdAndOnwerId(fieldId, ownerId);
        try {
            await this.fieldRepositoy.remove(field);
        }
        catch {
            throw new common_1.BadRequestException('An error occurred when delete field');
        }
        return {
            message: 'Delete field successful',
        };
    }
};
exports.FieldService = FieldService;
exports.FieldService = FieldService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(field_entity_1.Field)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        field_group_service_1.FieldGroupService,
        typeorm_1.DataSource])
], FieldService);
//# sourceMappingURL=field.service.js.map
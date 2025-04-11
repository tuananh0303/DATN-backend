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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFacilityDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_field_group_dto_1 = require("../../../field-groups/dtos/request/create-field-group.dto");
class CreateFacilityDto {
    name;
    description;
    openTime1;
    closeTime1;
    openTime2;
    closeTime2;
    openTime3;
    closeTime3;
    location;
    fieldGroups;
}
exports.CreateFacilityDto = CreateFacilityDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: 'Facility name',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(5),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateFacilityDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
        example: 'Facility description',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFacilityDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '6:00',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMilitaryTime)(),
    __metadata("design:type", String)
], CreateFacilityDto.prototype, "openTime1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '22:00',
    }),
    (0, class_validator_1.IsMilitaryTime)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFacilityDto.prototype, "closeTime1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '6:00',
        nullable: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMilitaryTime)(),
    __metadata("design:type", String)
], CreateFacilityDto.prototype, "openTime2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '22:00',
        nullable: true,
    }),
    (0, class_validator_1.IsMilitaryTime)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFacilityDto.prototype, "closeTime2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '6:00',
        nullable: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMilitaryTime)(),
    __metadata("design:type", String)
], CreateFacilityDto.prototype, "openTime3", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '22:00',
        nullable: true,
    }),
    (0, class_validator_1.IsMilitaryTime)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateFacilityDto.prototype, "closeTime3", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: 'Facility location',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFacilityDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [create_field_group_dto_1.CreateFieldGroupDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_field_group_dto_1.CreateFieldGroupDto),
    __metadata("design:type", Array)
], CreateFacilityDto.prototype, "fieldGroups", void 0);
//# sourceMappingURL=create-facility.dto.js.map
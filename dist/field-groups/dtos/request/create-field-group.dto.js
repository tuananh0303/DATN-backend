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
exports.CreateFieldGroupDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_field_dto_1 = require("../../../fields/dtos/requests/create-field.dto");
class CreateFieldGroupDto {
    name;
    dimension;
    surface;
    basePrice;
    peakStartTime1;
    peakEndTime1;
    priceIncrease1;
    peakStartTime2;
    peakEndTime2;
    priceIncrease2;
    peakStartTime3;
    peakEndTime3;
    priceIncrease3;
    sportIds;
    fields;
}
exports.CreateFieldGroupDto = CreateFieldGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: 'Field group name',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateFieldGroupDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '120x240',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateFieldGroupDto.prototype, "dimension", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: 'mặt cỏ',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateFieldGroupDto.prototype, "surface", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
        example: 100000,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateFieldGroupDto.prototype, "basePrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'string',
        example: '18:00',
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMilitaryTime)(),
    __metadata("design:type", String)
], CreateFieldGroupDto.prototype, "peakStartTime1", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'string',
        example: '21:00',
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMilitaryTime)(),
    __metadata("design:type", String)
], CreateFieldGroupDto.prototype, "peakEndTime1", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'number',
        example: 50000,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateFieldGroupDto.prototype, "priceIncrease1", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'string',
        example: '18:00',
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMilitaryTime)(),
    __metadata("design:type", String)
], CreateFieldGroupDto.prototype, "peakStartTime2", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'string',
        example: '21:00',
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMilitaryTime)(),
    __metadata("design:type", String)
], CreateFieldGroupDto.prototype, "peakEndTime2", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'number',
        example: 50000,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateFieldGroupDto.prototype, "priceIncrease2", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'string',
        example: '18:00',
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMilitaryTime)(),
    __metadata("design:type", String)
], CreateFieldGroupDto.prototype, "peakStartTime3", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'string',
        example: '21:00',
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMilitaryTime)(),
    __metadata("design:type", String)
], CreateFieldGroupDto.prototype, "peakEndTime3", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'number',
        example: 50000,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateFieldGroupDto.prototype, "priceIncrease3", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'array',
        example: [1, 2],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreateFieldGroupDto.prototype, "sportIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'array',
        example: [{ name: 'field name' }],
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_field_dto_1.CreateFieldDto),
    __metadata("design:type", Array)
], CreateFieldGroupDto.prototype, "fields", void 0);
//# sourceMappingURL=create-field-group.dto.js.map
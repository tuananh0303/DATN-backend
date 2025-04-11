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
exports.UpdateFieldGroupDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateFieldGroupDto {
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
}
exports.UpdateFieldGroupDto = UpdateFieldGroupDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
        example: 'Field group name',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UpdateFieldGroupDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '120x240',
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateFieldGroupDto.prototype, "dimension", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: 'mặt cỏ',
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateFieldGroupDto.prototype, "surface", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
        example: 100000,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateFieldGroupDto.prototype, "basePrice", void 0);
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
], UpdateFieldGroupDto.prototype, "peakStartTime1", void 0);
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
], UpdateFieldGroupDto.prototype, "peakEndTime1", void 0);
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
], UpdateFieldGroupDto.prototype, "priceIncrease1", void 0);
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
], UpdateFieldGroupDto.prototype, "peakStartTime2", void 0);
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
], UpdateFieldGroupDto.prototype, "peakEndTime2", void 0);
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
], UpdateFieldGroupDto.prototype, "priceIncrease2", void 0);
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
], UpdateFieldGroupDto.prototype, "peakStartTime3", void 0);
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
], UpdateFieldGroupDto.prototype, "peakEndTime3", void 0);
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
], UpdateFieldGroupDto.prototype, "priceIncrease3", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'array',
        example: [1, 2],
        nullable: true,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateFieldGroupDto.prototype, "sportIds", void 0);
//# sourceMappingURL=update-field-group.dto.js.map
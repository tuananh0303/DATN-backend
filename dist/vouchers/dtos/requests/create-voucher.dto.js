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
exports.CreateVoucherDto = void 0;
const voucher_type_enum_1 = require("../../enums/voucher-type.enum");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateVoucherDto {
    name;
    startDate;
    endDate;
    voucherType;
    discount;
    minPrice;
    maxDiscount;
    amount;
}
exports.CreateVoucherDto = CreateVoucherDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: 'KHAI TRUONG CS 1',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateVoucherDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '2025-03-12T00:00:00.000Z',
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], CreateVoucherDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '2025-04-12T00:00:00.000Z',
    }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], CreateVoucherDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        enum: voucher_type_enum_1.VoucherTypeEnum,
        example: voucher_type_enum_1.VoucherTypeEnum.CASH,
    }),
    (0, class_validator_1.IsEnum)(voucher_type_enum_1.VoucherTypeEnum),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateVoucherDto.prototype, "voucherType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
        example: 20000,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateVoucherDto.prototype, "discount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
        example: 100000,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateVoucherDto.prototype, "minPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
        example: 20000,
        nullable: true,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateVoucherDto.prototype, "maxDiscount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
        example: 100,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateVoucherDto.prototype, "amount", void 0);
//# sourceMappingURL=create-voucher.dto.js.map
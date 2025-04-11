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
exports.UpdatePersonDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const gender_enum_1 = require("../../enums/gender.enum");
const class_transformer_1 = require("class-transformer");
class UpdatePersonDto {
    name;
    email;
    phoneNumber;
    gender;
    dob;
    bankAccount;
}
exports.UpdatePersonDto = UpdatePersonDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
        example: 'Duong Van Nghia',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UpdatePersonDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        nullable: true,
        example: 'nghiaduong2202@gmail.com',
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePersonDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '+84367459330',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], UpdatePersonDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        enum: gender_enum_1.GenderEnum,
        example: gender_enum_1.GenderEnum.MALE,
    }),
    (0, class_validator_1.IsEnum)(gender_enum_1.GenderEnum),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePersonDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '2025-03-12T00:00:00.000Z',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Date)
], UpdatePersonDto.prototype, "dob", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '123456789',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePersonDto.prototype, "bankAccount", void 0);
//# sourceMappingURL=update-person.dto.js.map
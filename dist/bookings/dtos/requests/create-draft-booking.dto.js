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
exports.CreateDraftBookingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const create_booking_slot_dto_1 = require("../../../booking-slots/dtos/requests/create-booking-slot.dto");
class CreateDraftBookingDto {
    startTime;
    endTime;
    bookingSlots;
    sportId;
}
exports.CreateDraftBookingDto = CreateDraftBookingDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '06:00',
    }),
    (0, class_validator_1.IsMilitaryTime)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDraftBookingDto.prototype, "startTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '08:00',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMilitaryTime)(),
    __metadata("design:type", String)
], CreateDraftBookingDto.prototype, "endTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: create_booking_slot_dto_1.CreateBookingSlotDto,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => create_booking_slot_dto_1.CreateBookingSlotDto),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Array)
], CreateDraftBookingDto.prototype, "bookingSlots", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'number',
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateDraftBookingDto.prototype, "sportId", void 0);
//# sourceMappingURL=create-draft-booking.dto.js.map
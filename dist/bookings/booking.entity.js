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
exports.Booking = void 0;
const typeorm_1 = require("typeorm");
const booking_status_enum_1 = require("./enums/booking-status.enum");
const person_entity_1 = require("../people/person.entity");
const sport_entity_1 = require("../sports/sport.entity");
const booking_slot_entity_1 = require("../booking-slots/booking-slot.entity");
const additional_service_entity_1 = require("../additional-services/additional-service.entity");
const payment_entity_1 = require("../payments/payment.entity");
const is_before_1 = require("../util/is-before");
let Booking = class Booking {
    id;
    startTime;
    endTime;
    createdAt;
    updatedAt;
    status;
    player;
    sport;
    bookingSlots;
    payment;
    additionalServices;
    beforeInsert() {
        (0, is_before_1.isBefore)(this.startTime, this.endTime, 'Start time must be more than end time');
    }
};
exports.Booking = Booking;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Booking.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time',
        nullable: false,
    }),
    __metadata("design:type", String)
], Booking.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time',
        nullable: false,
    }),
    __metadata("design:type", String)
], Booking.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        nullable: false,
    }),
    __metadata("design:type", Date)
], Booking.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamptz',
        nullable: false,
    }),
    __metadata("design:type", Date)
], Booking.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: booking_status_enum_1.BookingStatusEnum,
        nullable: false,
        default: booking_status_enum_1.BookingStatusEnum.DRAFT,
    }),
    __metadata("design:type", String)
], Booking.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => person_entity_1.Person, (person) => person.bookings),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", person_entity_1.Person)
], Booking.prototype, "player", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sport_entity_1.Sport, {
        onDelete: 'RESTRICT',
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", sport_entity_1.Sport)
], Booking.prototype, "sport", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => booking_slot_entity_1.BookingSlot, (bookingSlot) => bookingSlot.booking),
    __metadata("design:type", Array)
], Booking.prototype, "bookingSlots", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => payment_entity_1.Payment, (payment) => payment.booking),
    __metadata("design:type", payment_entity_1.Payment)
], Booking.prototype, "payment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => additional_service_entity_1.AdditionalService, (additionalService) => additionalService.booking),
    __metadata("design:type", Array)
], Booking.prototype, "additionalServices", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Booking.prototype, "beforeInsert", null);
exports.Booking = Booking = __decorate([
    (0, typeorm_1.Entity)()
], Booking);
//# sourceMappingURL=booking.entity.js.map
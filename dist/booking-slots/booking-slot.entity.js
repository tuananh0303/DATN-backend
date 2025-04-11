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
exports.BookingSlot = void 0;
const booking_entity_1 = require("../bookings/booking.entity");
const field_entity_1 = require("../fields/field.entity");
const typeorm_1 = require("typeorm");
let BookingSlot = class BookingSlot {
    id;
    date;
    field;
    booking;
    afterLoad() {
        this.date = new Date(this.date);
    }
};
exports.BookingSlot = BookingSlot;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('identity'),
    __metadata("design:type", Number)
], BookingSlot.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
    }),
    __metadata("design:type", Date)
], BookingSlot.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => field_entity_1.Field, (field) => field.bookingSlots, {
        nullable: false,
    }),
    __metadata("design:type", field_entity_1.Field)
], BookingSlot.prototype, "field", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => booking_entity_1.Booking, (booking) => booking.bookingSlots, {
        onDelete: 'CASCADE',
        nullable: false,
    }),
    __metadata("design:type", booking_entity_1.Booking)
], BookingSlot.prototype, "booking", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookingSlot.prototype, "afterLoad", null);
exports.BookingSlot = BookingSlot = __decorate([
    (0, typeorm_1.Entity)()
], BookingSlot);
//# sourceMappingURL=booking-slot.entity.js.map
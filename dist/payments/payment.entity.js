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
exports.Payment = void 0;
const typeorm_1 = require("typeorm");
const payment_status_enum_1 = require("./enums/payment-status.enum");
const booking_entity_1 = require("../bookings/booking.entity");
const voucher_entity_1 = require("../vouchers/voucher.entity");
let Payment = class Payment {
    id;
    fieldPrice;
    servicePrice;
    voucher;
    discount;
    status;
    booking;
};
exports.Payment = Payment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Payment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
        nullable: false,
    }),
    __metadata("design:type", Number)
], Payment.prototype, "fieldPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Payment.prototype, "servicePrice", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => voucher_entity_1.Voucher, (voucher) => voucher.payments),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", voucher_entity_1.Voucher)
], Payment.prototype, "voucher", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Payment.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: payment_status_enum_1.PaymentStatusEnum,
        default: payment_status_enum_1.PaymentStatusEnum.UNPAID,
        nullable: false,
    }),
    __metadata("design:type", String)
], Payment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => booking_entity_1.Booking, (booking) => booking.payment, {
        onDelete: 'CASCADE',
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", booking_entity_1.Booking)
], Payment.prototype, "booking", void 0);
exports.Payment = Payment = __decorate([
    (0, typeorm_1.Entity)()
], Payment);
//# sourceMappingURL=payment.entity.js.map
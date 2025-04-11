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
exports.AdditionalService = void 0;
const booking_entity_1 = require("../bookings/booking.entity");
const service_entity_1 = require("../services/service.entity");
const typeorm_1 = require("typeorm");
let AdditionalService = class AdditionalService {
    serviceId;
    bookingId;
    quantity;
    service;
    booking;
};
exports.AdditionalService = AdditionalService;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], AdditionalService.prototype, "serviceId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], AdditionalService.prototype, "bookingId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
        nullable: false,
        default: 1,
    }),
    __metadata("design:type", Number)
], AdditionalService.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.Service, (service) => service.additionalServices, {
        nullable: false,
    }),
    __metadata("design:type", service_entity_1.Service)
], AdditionalService.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => booking_entity_1.Booking, (booking) => booking.additionalServices, {
        onDelete: 'CASCADE',
        nullable: false,
    }),
    __metadata("design:type", booking_entity_1.Booking)
], AdditionalService.prototype, "booking", void 0);
exports.AdditionalService = AdditionalService = __decorate([
    (0, typeorm_1.Entity)()
], AdditionalService);
//# sourceMappingURL=additional-service.entity.js.map
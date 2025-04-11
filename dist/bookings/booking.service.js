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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const booking_entity_1 = require("./booking.entity");
const typeorm_1 = require("typeorm");
const payment_status_enum_1 = require("../payments/enums/payment-status.enum");
const field_service_1 = require("../fields/field.service");
const person_service_1 = require("../people/person.service");
const sport_service_1 = require("../sports/sport.service");
let BookingService = class BookingService {
    fieldService;
    dataSource;
    personService;
    sportService;
    constructor(fieldService, dataSource, personService, sportService) {
        this.fieldService = fieldService;
        this.dataSource = dataSource;
        this.personService = personService;
        this.sportService = sportService;
    }
    async createDraft(createDraftBookingDto, playerId) {
        throw new common_1.BadRequestException('chua ho tro');
    }
    async checkOverlapBookingsWithTransaction(fieldId, date, startTime, endTime, queryRunner) {
        const overlapBooking = await queryRunner.manager.findOne(booking_entity_1.Booking, {
            where: [
                {
                    bookingSlots: {
                        field: {
                            id: fieldId,
                        },
                        date: date,
                    },
                    startTime: (0, typeorm_1.Between)(startTime, endTime),
                    payment: {
                        status: (0, typeorm_1.Not)(payment_status_enum_1.PaymentStatusEnum.CANCELLED),
                    },
                },
                {
                    bookingSlots: {
                        field: {
                            id: fieldId,
                        },
                        date: date,
                    },
                    payment: {
                        status: (0, typeorm_1.Not)(payment_status_enum_1.PaymentStatusEnum.CANCELLED),
                    },
                    endTime: (0, typeorm_1.Between)(startTime, endTime),
                },
                {
                    bookingSlots: {
                        field: {
                            id: fieldId,
                        },
                        date: date,
                    },
                    payment: {
                        status: (0, typeorm_1.Not)(payment_status_enum_1.PaymentStatusEnum.CANCELLED),
                    },
                    startTime: (0, typeorm_1.LessThanOrEqual)(startTime),
                    endTime: (0, typeorm_1.MoreThanOrEqual)(endTime),
                },
            ],
        });
        if (overlapBooking) {
            throw new common_1.BadRequestException('Booking time overlap with another booking');
        }
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [field_service_1.FieldService,
        typeorm_1.DataSource,
        person_service_1.PersonService,
        sport_service_1.SportService])
], BookingService);
//# sourceMappingURL=booking.service.js.map
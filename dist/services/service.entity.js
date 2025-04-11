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
exports.Service = void 0;
const common_1 = require("@nestjs/common");
const facility_entity_1 = require("../facilities/facility.entity");
const sport_entity_1 = require("../sports/sport.entity");
const typeorm_1 = require("typeorm");
const service_type_enum_1 = require("./enums/service-type.enum");
const additional_service_entity_1 = require("../additional-services/additional-service.entity");
let Service = class Service {
    id;
    name;
    price;
    type;
    description;
    amount;
    bookedCount;
    unit;
    sport;
    facility;
    additionalServices;
    beforeUpdateAndInsert() {
        if (this.amount < 0) {
            throw new common_1.BadRequestException('Amount of service must be more than or equal to 0');
        }
    }
};
exports.Service = Service;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('identity'),
    __metadata("design:type", Number)
], Service.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], Service.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
        nullable: false,
    }),
    __metadata("design:type", Number)
], Service.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: service_type_enum_1.ServiceTypeEnum,
        nullable: false,
    }),
    __metadata("design:type", String)
], Service.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Service.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
        nullable: false,
        default: 0,
    }),
    __metadata("design:type", Number)
], Service.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
        nullable: false,
        default: 0,
    }),
    __metadata("design:type", Number)
], Service.prototype, "bookedCount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], Service.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => sport_entity_1.Sport, {
        onDelete: 'RESTRICT',
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", sport_entity_1.Sport)
], Service.prototype, "sport", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => facility_entity_1.Facility, (facility) => facility.services, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", facility_entity_1.Facility)
], Service.prototype, "facility", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => additional_service_entity_1.AdditionalService, (additionalService) => additionalService.service),
    __metadata("design:type", Array)
], Service.prototype, "additionalServices", void 0);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Service.prototype, "beforeUpdateAndInsert", null);
exports.Service = Service = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['name', 'facility'])
], Service);
//# sourceMappingURL=service.entity.js.map
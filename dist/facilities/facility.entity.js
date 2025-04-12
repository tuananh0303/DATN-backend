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
exports.Facility = void 0;
const typeorm_1 = require("typeorm");
const facility_status_enum_1 = require("./enums/facility-status.enum");
const field_group_entity_1 = require("../field-groups/field-group.entity");
const person_entity_1 = require("../people/person.entity");
const is_before_1 = require("../util/is-before");
const certificate_entity_1 = require("../certificates/certificate.entity");
const license_entity_1 = require("../licenses/license.entity");
const service_entity_1 = require("../services/service.entity");
const voucher_entity_1 = require("../vouchers/voucher.entity");
const approval_entity_1 = require("../approvals/approval.entity");
let Facility = class Facility {
    id;
    name;
    description;
    openTime1;
    closeTime1;
    openTime2;
    closeTime2;
    openTime3;
    closeTime3;
    numberOfShifts;
    location;
    status;
    avgRating;
    numberOfRating;
    imagesUrl;
    createdAt;
    updatedAt;
    services;
    vouchers;
    fieldGroups;
    owner;
    certificate;
    licenses;
    approvals;
    beforeInsertAndUpdate() {
        (0, is_before_1.isBefore)(this.openTime1, this.closeTime1, 'Open time must be before close time');
        this.numberOfShifts = 1;
        if (this.openTime2 && this.closeTime2) {
            (0, is_before_1.isBefore)(this.closeTime1, this.openTime2, 'Close time 1 must be before openTime 2');
            (0, is_before_1.isBefore)(this.openTime2, this.closeTime2, 'Open time must be before close time');
            this.numberOfShifts = 2;
            if (this.openTime3 && this.closeTime3) {
                (0, is_before_1.isBefore)(this.closeTime1, this.openTime2, 'Close time 2 must be before openTime 3');
                (0, is_before_1.isBefore)(this.openTime3, this.closeTime3, 'Open time must be before close time');
                this.numberOfShifts = 3;
            }
        }
    }
};
exports.Facility = Facility;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Facility.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        unique: true,
        nullable: false,
    }),
    __metadata("design:type", String)
], Facility.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Facility.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time',
        nullable: false,
    }),
    __metadata("design:type", String)
], Facility.prototype, "openTime1", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time',
        nullable: false,
    }),
    __metadata("design:type", String)
], Facility.prototype, "closeTime1", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time',
        nullable: true,
    }),
    __metadata("design:type", String)
], Facility.prototype, "openTime2", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time',
        nullable: true,
    }),
    __metadata("design:type", String)
], Facility.prototype, "closeTime2", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time',
        nullable: true,
    }),
    __metadata("design:type", String)
], Facility.prototype, "openTime3", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time',
        nullable: true,
    }),
    __metadata("design:type", String)
], Facility.prototype, "closeTime3", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
        nullable: false,
        default: 1,
    }),
    __metadata("design:type", Number)
], Facility.prototype, "numberOfShifts", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], Facility.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: facility_status_enum_1.FacilityStatusEnum,
        nullable: false,
        default: facility_status_enum_1.FacilityStatusEnum.PENDING,
    }),
    __metadata("design:type", String)
], Facility.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'real',
        nullable: false,
        default: 0.0,
    }),
    __metadata("design:type", Number)
], Facility.prototype, "avgRating", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
        nullable: false,
        default: 0,
    }),
    __metadata("design:type", Number)
], Facility.prototype, "numberOfRating", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        array: true,
        nullable: true,
    }),
    __metadata("design:type", Array)
], Facility.prototype, "imagesUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Facility.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Facility.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_entity_1.Service, (service) => service.facility),
    __metadata("design:type", Array)
], Facility.prototype, "services", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => voucher_entity_1.Voucher, (voucher) => voucher.facility),
    __metadata("design:type", Array)
], Facility.prototype, "vouchers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => field_group_entity_1.FieldGroup, (fieldGroup) => fieldGroup.facility),
    __metadata("design:type", Array)
], Facility.prototype, "fieldGroups", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => person_entity_1.Person, (person) => person.facilities, {
        nullable: false,
        onDelete: 'RESTRICT',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", person_entity_1.Person)
], Facility.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => certificate_entity_1.Certificate, (certificate) => certificate.facility),
    __metadata("design:type", certificate_entity_1.Certificate)
], Facility.prototype, "certificate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => license_entity_1.License, (license) => license.facility),
    __metadata("design:type", Array)
], Facility.prototype, "licenses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => approval_entity_1.Approval, (approvals) => approvals.facility),
    __metadata("design:type", Array)
], Facility.prototype, "approvals", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Facility.prototype, "beforeInsertAndUpdate", null);
exports.Facility = Facility = __decorate([
    (0, typeorm_1.Entity)()
], Facility);
//# sourceMappingURL=facility.entity.js.map
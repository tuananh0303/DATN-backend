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
exports.FieldGroup = void 0;
const facility_entity_1 = require("../facilities/facility.entity");
const field_entity_1 = require("../fields/field.entity");
const sport_entity_1 = require("../sports/sport.entity");
const is_before_1 = require("../util/is-before");
const typeorm_1 = require("typeorm");
let FieldGroup = class FieldGroup {
    id;
    name;
    dimension;
    surface;
    basePrice;
    peakStartTime1;
    peakEndTime1;
    priceIncrease1;
    peakStartTime2;
    peakEndTime2;
    priceIncrease2;
    peakStartTime3;
    peakEndTime3;
    priceIncrease3;
    numberOfPeaks;
    fields;
    facility;
    sports;
    beforeInsertAndUpdate() {
        if (this.peakEndTime1 && this.peakStartTime1) {
            (0, is_before_1.isBefore)(this.peakStartTime1, this.peakEndTime1, 'Peak start time must be before peak end time');
            this.numberOfPeaks = 1;
        }
        if (this.peakEndTime2 && this.peakStartTime2) {
            (0, is_before_1.isBefore)(this.peakStartTime2, this.peakEndTime2, 'Peak start time must be before peak end time');
            this.numberOfPeaks = 2;
        }
        if (this.peakEndTime3 && this.peakStartTime3) {
            (0, is_before_1.isBefore)(this.peakStartTime3, this.peakEndTime3, 'Peak start time must be before peak end time');
            this.numberOfPeaks = 3;
        }
    }
};
exports.FieldGroup = FieldGroup;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], FieldGroup.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], FieldGroup.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], FieldGroup.prototype, "dimension", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], FieldGroup.prototype, "surface", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
        nullable: false,
    }),
    __metadata("design:type", Number)
], FieldGroup.prototype, "basePrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time',
        nullable: true,
    }),
    __metadata("design:type", String)
], FieldGroup.prototype, "peakStartTime1", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time',
        nullable: true,
    }),
    __metadata("design:type", String)
], FieldGroup.prototype, "peakEndTime1", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
        nullable: true,
    }),
    __metadata("design:type", Number)
], FieldGroup.prototype, "priceIncrease1", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time',
        nullable: true,
    }),
    __metadata("design:type", String)
], FieldGroup.prototype, "peakStartTime2", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time',
        nullable: true,
    }),
    __metadata("design:type", String)
], FieldGroup.prototype, "peakEndTime2", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
        nullable: true,
    }),
    __metadata("design:type", Number)
], FieldGroup.prototype, "priceIncrease2", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time',
        nullable: true,
    }),
    __metadata("design:type", String)
], FieldGroup.prototype, "peakStartTime3", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'time',
        nullable: true,
    }),
    __metadata("design:type", String)
], FieldGroup.prototype, "peakEndTime3", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
        nullable: true,
    }),
    __metadata("design:type", Number)
], FieldGroup.prototype, "priceIncrease3", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
        nullable: false,
        default: 0,
    }),
    __metadata("design:type", Number)
], FieldGroup.prototype, "numberOfPeaks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => field_entity_1.Field, (field) => field.fieldGroup),
    __metadata("design:type", Array)
], FieldGroup.prototype, "fields", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => facility_entity_1.Facility, (facility) => facility.fieldGroups, {
        onDelete: 'CASCADE',
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", facility_entity_1.Facility)
], FieldGroup.prototype, "facility", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => sport_entity_1.Sport),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], FieldGroup.prototype, "sports", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FieldGroup.prototype, "beforeInsertAndUpdate", null);
exports.FieldGroup = FieldGroup = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['name', 'facility'])
], FieldGroup);
//# sourceMappingURL=field-group.entity.js.map
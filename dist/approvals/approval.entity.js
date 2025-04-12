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
exports.Approval = void 0;
const typeorm_1 = require("typeorm");
const approval_type_enum_1 = require("./enums/approval-type.enum");
const approval_status_enum_1 = require("./enums/approval-status.enum");
const facility_entity_1 = require("../facilities/facility.entity");
const sport_entity_1 = require("../sports/sport.entity");
let Approval = class Approval {
    id;
    type;
    status;
    name;
    certifiacte;
    license;
    sport;
    note;
    createdAt;
    updatedAt;
    facility;
};
exports.Approval = Approval;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Approval.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: approval_type_enum_1.ApprovalTypeEnum,
        nullable: false,
    }),
    __metadata("design:type", String)
], Approval.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: approval_status_enum_1.ApprovalStatusEnum,
        default: approval_status_enum_1.ApprovalStatusEnum.PENDING,
        nullable: false,
    }),
    __metadata("design:type", String)
], Approval.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Approval.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Approval.prototype, "certifiacte", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Approval.prototype, "license", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sport_entity_1.Sport, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", sport_entity_1.Sport)
], Approval.prototype, "sport", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Approval.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
    }),
    __metadata("design:type", Date)
], Approval.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamptz',
    }),
    __metadata("design:type", Date)
], Approval.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => facility_entity_1.Facility, (facility) => facility.approvals),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", facility_entity_1.Facility)
], Approval.prototype, "facility", void 0);
exports.Approval = Approval = __decorate([
    (0, typeorm_1.Entity)()
], Approval);
//# sourceMappingURL=approval.entity.js.map
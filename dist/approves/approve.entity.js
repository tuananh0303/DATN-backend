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
exports.Approve = void 0;
const typeorm_1 = require("typeorm");
const approve_type_enum_1 = require("./enums/approve-type.enum");
const approve_status_enum_1 = require("./enums/approve-status.enum");
const facility_entity_1 = require("../facilities/facility.entity");
let Approve = class Approve {
    id;
    type;
    status;
    name;
    certifiacte;
    license;
    sportId;
    note;
    facility;
};
exports.Approve = Approve;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Approve.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: approve_type_enum_1.ApproveTypeEnum,
        nullable: false,
    }),
    __metadata("design:type", String)
], Approve.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: approve_status_enum_1.ApproveStatusEnum,
        default: approve_status_enum_1.ApproveStatusEnum.PENDING,
        nullable: false,
    }),
    __metadata("design:type", String)
], Approve.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Approve.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Approve.prototype, "certifiacte", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Approve.prototype, "license", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Approve.prototype, "sportId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Approve.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => facility_entity_1.Facility, (facility) => facility.approves),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", facility_entity_1.Facility)
], Approve.prototype, "facility", void 0);
exports.Approve = Approve = __decorate([
    (0, typeorm_1.Entity)()
], Approve);
//# sourceMappingURL=approve.entity.js.map
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
exports.Certificate = void 0;
const facility_entity_1 = require("../facilities/facility.entity");
const typeorm_1 = require("typeorm");
let Certificate = class Certificate {
    facilityId;
    verified;
    temporary;
    facility;
};
exports.Certificate = Certificate;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], Certificate.prototype, "facilityId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Certificate.prototype, "verified", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Certificate.prototype, "temporary", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => facility_entity_1.Facility, (facility) => facility.certificate, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", facility_entity_1.Facility)
], Certificate.prototype, "facility", void 0);
exports.Certificate = Certificate = __decorate([
    (0, typeorm_1.Entity)()
], Certificate);
//# sourceMappingURL=certificate.entity.js.map
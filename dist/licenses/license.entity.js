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
exports.License = void 0;
const facility_entity_1 = require("../facilities/facility.entity");
const sport_entity_1 = require("../sports/sport.entity");
const typeorm_1 = require("typeorm");
let License = class License {
    facilityId;
    sportId;
    verified;
    facility;
    sport;
};
exports.License = License;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], License.prototype, "facilityId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], License.prototype, "sportId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], License.prototype, "verified", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => facility_entity_1.Facility, (facility) => facility.licenses, {
        onDelete: 'CASCADE',
        nullable: false,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", facility_entity_1.Facility)
], License.prototype, "facility", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sport_entity_1.Sport, {
        nullable: false,
        onDelete: 'RESTRICT',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", sport_entity_1.Sport)
], License.prototype, "sport", void 0);
exports.License = License = __decorate([
    (0, typeorm_1.Entity)()
], License);
//# sourceMappingURL=license.entity.js.map
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
exports.Field = void 0;
const typeorm_1 = require("typeorm");
const field_status_enum_1 = require("./enums/field-status.enum");
const field_group_entity_1 = require("../field-groups/field-group.entity");
const booking_slot_entity_1 = require("../booking-slots/booking-slot.entity");
let Field = class Field {
    id;
    name;
    status;
    fieldGroup;
    bookingSlots;
};
exports.Field = Field;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('identity'),
    __metadata("design:type", Number)
], Field.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], Field.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: field_status_enum_1.FieldStatusEnum,
        default: field_status_enum_1.FieldStatusEnum.ACTIVE,
    }),
    __metadata("design:type", String)
], Field.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => field_group_entity_1.FieldGroup, (fieldGroup) => fieldGroup.fields, {
        onDelete: 'CASCADE',
        nullable: false,
    }),
    __metadata("design:type", field_group_entity_1.FieldGroup)
], Field.prototype, "fieldGroup", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => booking_slot_entity_1.BookingSlot, (bookingSlot) => bookingSlot.field),
    __metadata("design:type", Array)
], Field.prototype, "bookingSlots", void 0);
exports.Field = Field = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['name', 'fieldGroup'])
], Field);
//# sourceMappingURL=field.entity.js.map
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
exports.Person = void 0;
const typeorm_1 = require("typeorm");
const gender_enum_1 = require("./enums/gender.enum");
const person_role_enum_1 = require("./enums/person-role.enum");
const facility_entity_1 = require("../facilities/facility.entity");
const booking_entity_1 = require("../bookings/booking.entity");
let Person = class Person {
    id;
    name;
    email;
    password;
    phoneNumber;
    avatarUrl;
    gender;
    dob;
    bankAccount;
    role;
    createdAt;
    updatedAt;
    facilities;
    bookings;
    afterLoad() {
        if (this.dob) {
            this.dob = new Date(this.dob);
        }
    }
};
exports.Person = Person;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Person.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], Person.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'email',
        type: 'varchar',
        length: 255,
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Person.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], Person.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'phone_number',
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Person.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", String)
], Person.prototype, "avatarUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: gender_enum_1.GenderEnum,
        nullable: true,
    }),
    __metadata("design:type", String)
], Person.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Person.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: true,
    }),
    __metadata("design:type", String)
], Person.prototype, "bankAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: person_role_enum_1.PersonRoleEnum,
        nullable: false,
        default: person_role_enum_1.PersonRoleEnum.PLAYER,
    }),
    __metadata("design:type", String)
], Person.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Person.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Person.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => facility_entity_1.Facility, (facility) => facility.owner),
    __metadata("design:type", Array)
], Person.prototype, "facilities", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => booking_entity_1.Booking, (booking) => booking.player),
    __metadata("design:type", Array)
], Person.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Person.prototype, "afterLoad", null);
exports.Person = Person = __decorate([
    (0, typeorm_1.Entity)()
], Person);
//# sourceMappingURL=person.entity.js.map
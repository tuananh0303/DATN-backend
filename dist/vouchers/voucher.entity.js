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
exports.Voucher = void 0;
const typeorm_1 = require("typeorm");
const voucher_type_enum_1 = require("./enums/voucher-type.enum");
const facility_entity_1 = require("../facilities/facility.entity");
const common_1 = require("@nestjs/common");
const payment_entity_1 = require("../payments/payment.entity");
let Voucher = class Voucher {
    id;
    name;
    startDate;
    endDate;
    voucherType;
    discount;
    minPrice;
    maxDiscount;
    amount;
    remain;
    createdAt;
    updatedAt;
    facility;
    payments;
    beforeInsert() {
        this.remain = this.amount;
    }
    beforeInsertAnUpdate() {
        if (this.startDate.valueOf() > this.endDate.valueOf()) {
            throw new common_1.BadRequestException('startDate must be more than endDate');
        }
        if (this.voucherType === voucher_type_enum_1.VoucherTypeEnum.PERCENT && this.discount > 100) {
            throw new common_1.BadRequestException('Discount must be less than 100');
        }
    }
    afterLoad() {
        this.startDate = new Date(this.startDate);
        this.endDate = new Date(this.endDate);
    }
};
exports.Voucher = Voucher;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Voucher.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: false,
    }),
    __metadata("design:type", String)
], Voucher.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: false,
    }),
    __metadata("design:type", Date)
], Voucher.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: false,
    }),
    __metadata("design:type", Date)
], Voucher.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: voucher_type_enum_1.VoucherTypeEnum,
        nullable: false,
    }),
    __metadata("design:type", String)
], Voucher.prototype, "voucherType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'real',
        nullable: false,
        default: 0,
    }),
    __metadata("design:type", Number)
], Voucher.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false,
        default: 0,
    }),
    __metadata("design:type", Number)
], Voucher.prototype, "minPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Voucher.prototype, "maxDiscount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false,
    }),
    __metadata("design:type", Number)
], Voucher.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false,
    }),
    __metadata("design:type", Number)
], Voucher.prototype, "remain", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Voucher.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], Voucher.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => facility_entity_1.Facility, (facility) => facility.vouchers, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", facility_entity_1.Facility)
], Voucher.prototype, "facility", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_entity_1.Payment, (payments) => payments.voucher),
    __metadata("design:type", Array)
], Voucher.prototype, "payments", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Voucher.prototype, "beforeInsert", null);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Voucher.prototype, "beforeInsertAnUpdate", null);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Voucher.prototype, "afterLoad", null);
exports.Voucher = Voucher = __decorate([
    (0, typeorm_1.Entity)()
], Voucher);
//# sourceMappingURL=voucher.entity.js.map
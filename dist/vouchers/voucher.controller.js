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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoucherController = void 0;
const common_1 = require("@nestjs/common");
const voucher_service_1 = require("./voucher.service");
const swagger_1 = require("@nestjs/swagger");
const auth_role_decorator_1 = require("../auths/decorators/auth-role.decorator");
const auth_role_enum_1 = require("../auths/enums/auth-role.enum");
const create_voucher_dto_1 = require("./dtos/requests/create-voucher.dto");
const active_person_decorator_1 = require("../auths/decorators/active-person.decorator");
const update_voucher_dto_1 = require("./dtos/requests/update-voucher.dto");
let VoucherController = class VoucherController {
    voucherService;
    constructor(voucherService) {
        this.voucherService = voucherService;
    }
    create(createVoucherDto, facilityId, ownerId) {
        return this.voucherService.create(createVoucherDto, facilityId, ownerId);
    }
    delete(voucherId, ownerId) {
        return this.voucherService.delete(voucherId, ownerId);
    }
    update(updateVoucherDto, ownerID) {
        return this.voucherService.update(updateVoucherDto, ownerID);
    }
    getByFacility(facilityId) {
        return this.voucherService.getByFacility(facilityId);
    }
};
exports.VoucherController = VoucherController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'create voucher (role: owner)',
    }),
    (0, common_1.Post)(':facilityId'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.OWNER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('facilityId', common_1.ParseUUIDPipe)),
    __param(2, (0, active_person_decorator_1.ActivePerson)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_voucher_dto_1.CreateVoucherDto, String, String]),
    __metadata("design:returntype", void 0)
], VoucherController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'delete vvoucher (role: owner)',
    }),
    (0, common_1.Delete)(':voucherId'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.OWNER),
    __param(0, (0, common_1.Param)('voucherId')),
    __param(1, (0, active_person_decorator_1.ActivePerson)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], VoucherController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'update voucher (role: owner)',
    }),
    (0, common_1.Patch)(),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.OWNER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_person_decorator_1.ActivePerson)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_voucher_dto_1.UpdateVoucherDto, String]),
    __metadata("design:returntype", void 0)
], VoucherController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'get voucher by facility (role: none)',
    }),
    (0, common_1.Get)(':facilityId'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.NONE),
    __param(0, (0, common_1.Param)('facilityId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VoucherController.prototype, "getByFacility", null);
exports.VoucherController = VoucherController = __decorate([
    (0, common_1.Controller)('voucher'),
    __metadata("design:paramtypes", [voucher_service_1.VoucherService])
], VoucherController);
//# sourceMappingURL=voucher.controller.js.map
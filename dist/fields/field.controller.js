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
exports.FieldController = void 0;
const common_1 = require("@nestjs/common");
const field_service_1 = require("./field.service");
const swagger_1 = require("@nestjs/swagger");
const auth_role_decorator_1 = require("../auths/decorators/auth-role.decorator");
const auth_role_enum_1 = require("../auths/enums/auth-role.enum");
const create_many_fields_1 = require("./dtos/requests/create-many-fields");
const active_person_decorator_1 = require("../auths/decorators/active-person.decorator");
const update_field_dto_1 = require("./dtos/requests/update-field.dto");
let FieldController = class FieldController {
    fieldService;
    constructor(fieldService) {
        this.fieldService = fieldService;
    }
    craeteMany(createManyFieldsDto, fieldGroupId, ownerId) {
        return this.fieldService.createMany(createManyFieldsDto, fieldGroupId, ownerId);
    }
    update(updateFieldDto, ownerId) {
        return this.fieldService.update(updateFieldDto, ownerId);
    }
    delete(fieldId, ownerID) {
        return this.fieldService.delete(fieldId, ownerID);
    }
};
exports.FieldController = FieldController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'create many fields (role: owner)',
    }),
    (0, common_1.Put)(':fieldGroupId'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.OWNER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('fieldGroupId', common_1.ParseUUIDPipe)),
    __param(2, (0, active_person_decorator_1.ActivePerson)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_many_fields_1.CreateManyFieldsDto, String, String]),
    __metadata("design:returntype", void 0)
], FieldController.prototype, "craeteMany", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'update field (role: owner)',
    }),
    (0, common_1.Patch)(),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.OWNER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_person_decorator_1.ActivePerson)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_field_dto_1.UpdateFieldDto, String]),
    __metadata("design:returntype", void 0)
], FieldController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'delete field (role: owner)',
    }),
    (0, common_1.Delete)(':fieldId'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.OWNER),
    __param(0, (0, common_1.Param)('fieldId', common_1.ParseIntPipe)),
    __param(1, (0, active_person_decorator_1.ActivePerson)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], FieldController.prototype, "delete", null);
exports.FieldController = FieldController = __decorate([
    (0, common_1.Controller)('field'),
    __metadata("design:paramtypes", [field_service_1.FieldService])
], FieldController);
//# sourceMappingURL=field.controller.js.map
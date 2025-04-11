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
exports.FieldGroupController = void 0;
const common_1 = require("@nestjs/common");
const field_group_service_1 = require("./field-group.service");
const swagger_1 = require("@nestjs/swagger");
const auth_role_decorator_1 = require("../auths/decorators/auth-role.decorator");
const auth_role_enum_1 = require("../auths/enums/auth-role.enum");
const craete_many_field_groups_dto_1 = require("./dtos/request/craete-many-field-groups.dto");
const active_person_decorator_1 = require("../auths/decorators/active-person.decorator");
const update_field_group_dto_1 = require("./dtos/request/update-field-group.dto");
let FieldGroupController = class FieldGroupController {
    fieldGroupService;
    constructor(fieldGroupService) {
        this.fieldGroupService = fieldGroupService;
    }
    createMany(createManyFieldGroupsDto, facilityId, ownerId) {
        return this.fieldGroupService.createMany(createManyFieldGroupsDto, facilityId, ownerId);
    }
    update(fieldGroupId, updateFieldGroupDto, ownerId) {
        return this.fieldGroupService.update(updateFieldGroupDto, fieldGroupId, ownerId);
    }
    delete(fieldGroupId, ownerId) {
        return this.fieldGroupService.delete(fieldGroupId, ownerId);
    }
    getByFacilityId(facilityId) {
        return this.fieldGroupService.getByFacilityId(facilityId);
    }
};
exports.FieldGroupController = FieldGroupController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'create many field group and fields (role: owner)',
    }),
    (0, common_1.Put)(':facilityId'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.OWNER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('facilityId', common_1.ParseUUIDPipe)),
    __param(2, (0, active_person_decorator_1.ActivePerson)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [craete_many_field_groups_dto_1.CreateManyFieldGroupsDto, String, String]),
    __metadata("design:returntype", void 0)
], FieldGroupController.prototype, "createMany", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'update field group (role: owner)',
    }),
    (0, common_1.Patch)(':fieldGroupId'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.OWNER),
    __param(0, (0, common_1.Param)('fieldGroupId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, active_person_decorator_1.ActivePerson)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_field_group_dto_1.UpdateFieldGroupDto, String]),
    __metadata("design:returntype", void 0)
], FieldGroupController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'delete field group (role: owner)',
    }),
    (0, common_1.Delete)(':fieldGroupId'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.OWNER),
    __param(0, (0, common_1.Param)('fieldGroupId', common_1.ParseUUIDPipe)),
    __param(1, (0, active_person_decorator_1.ActivePerson)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FieldGroupController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'get field group in facility (role: none)',
    }),
    (0, common_1.Get)(':facilityId'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.NONE),
    __param(0, (0, common_1.Param)('facilityId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FieldGroupController.prototype, "getByFacilityId", null);
exports.FieldGroupController = FieldGroupController = __decorate([
    (0, common_1.Controller)('field-group'),
    __metadata("design:paramtypes", [field_group_service_1.FieldGroupService])
], FieldGroupController);
//# sourceMappingURL=field-group.controller.js.map
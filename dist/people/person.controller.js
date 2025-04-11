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
exports.PersonController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const active_person_decorator_1 = require("../auths/decorators/active-person.decorator");
const auth_role_decorator_1 = require("../auths/decorators/auth-role.decorator");
const auth_role_enum_1 = require("../auths/enums/auth-role.enum");
const person_service_1 = require("./person.service");
const platform_express_1 = require("@nestjs/platform-express");
const update_person_dto_1 = require("./dtos/requests/update-person.dto");
let PersonController = class PersonController {
    personService;
    constructor(personService) {
        this.personService = personService;
    }
    getAll() { }
    getMyInfor(personId) {
        return this.personService.findOneById(personId);
    }
    updateAvata(image, personId) {
        return this.personService.updateAvatatar(image, personId);
    }
    updateInfo(updatePersonDto, personId) {
        return this.personService.updateInfo(updatePersonDto, personId);
    }
};
exports.PersonController = PersonController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'get all person (role: admin)',
    }),
    (0, common_1.Get)('all'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PersonController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get my information (role: admin, owner, player)',
    }),
    (0, common_1.Get)('my-info'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.ADMIN, auth_role_enum_1.AuthRoleEnum.OWNER, auth_role_enum_1.AuthRoleEnum.PLAYER),
    __param(0, (0, active_person_decorator_1.ActivePerson)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PersonController.prototype, "getMyInfor", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'update avata (role: admin, owner, player)',
    }),
    (0, common_1.Put)('update-avatar'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.ADMIN, auth_role_enum_1.AuthRoleEnum.OWNER, auth_role_enum_1.AuthRoleEnum.PLAYER),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, active_person_decorator_1.ActivePerson)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PersonController.prototype, "updateAvata", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'update info (role: admin, owner, player)',
    }),
    (0, common_1.Put)('update-infor'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.ADMIN, auth_role_enum_1.AuthRoleEnum.OWNER, auth_role_enum_1.AuthRoleEnum.PLAYER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_person_decorator_1.ActivePerson)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_person_dto_1.UpdatePersonDto, String]),
    __metadata("design:returntype", void 0)
], PersonController.prototype, "updateInfo", null);
exports.PersonController = PersonController = __decorate([
    (0, common_1.Controller)('person'),
    __metadata("design:paramtypes", [person_service_1.PersonService])
], PersonController);
//# sourceMappingURL=person.controller.js.map
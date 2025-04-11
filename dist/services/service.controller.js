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
exports.ServiceController = void 0;
const common_1 = require("@nestjs/common");
const service_service_1 = require("./service.service");
const swagger_1 = require("@nestjs/swagger");
const auth_role_decorator_1 = require("../auths/decorators/auth-role.decorator");
const auth_role_enum_1 = require("../auths/enums/auth-role.enum");
const create_many_services_dto_1 = require("./dtos/requests/create-many-services.dto");
const active_person_decorator_1 = require("../auths/decorators/active-person.decorator");
const update_service_dto_1 = require("./dtos/requests/update-service.dto");
let ServiceController = class ServiceController {
    serviceService;
    constructor(serviceService) {
        this.serviceService = serviceService;
    }
    createMany(createManyServicesDto, ownerId) {
        return this.serviceService.createMany(createManyServicesDto, ownerId);
    }
    update(serviceId, updateServiceDto, ownerId) {
        return this.serviceService.update(updateServiceDto, serviceId, ownerId);
    }
    delete(serviceId, ownerId) {
        return this.serviceService.delete(serviceId, ownerId);
    }
    getByFacility(facilityId) {
        return this.serviceService.getByFacility(facilityId);
    }
};
exports.ServiceController = ServiceController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'create many service (role: owner)',
    }),
    (0, common_1.Post)(),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.OWNER),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, active_person_decorator_1.ActivePerson)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_many_services_dto_1.CreateManyServicesDto, String]),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "createMany", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'upadte service (role: owner)',
    }),
    (0, common_1.Patch)(':serviceId'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.OWNER),
    __param(0, (0, common_1.Param)('serviceId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, active_person_decorator_1.ActivePerson)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_service_dto_1.UpdateServiceDto, String]),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'delete service (role: owner)',
    }),
    (0, common_1.Delete)(':serviceId'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.OWNER),
    __param(0, (0, common_1.Param)('serviceId', common_1.ParseIntPipe)),
    __param(1, (0, active_person_decorator_1.ActivePerson)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Get services by facility (role: none)',
    }),
    (0, common_1.Get)(':facilityId'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.NONE),
    __param(0, (0, common_1.Param)('facilityId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiceController.prototype, "getByFacility", null);
exports.ServiceController = ServiceController = __decorate([
    (0, common_1.Controller)('service'),
    __metadata("design:paramtypes", [service_service_1.ServiceService])
], ServiceController);
//# sourceMappingURL=service.controller.js.map
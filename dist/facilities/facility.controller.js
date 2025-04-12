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
exports.FacilityController = void 0;
const common_1 = require("@nestjs/common");
const facility_service_1 = require("./facility.service");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const create_facility_interceptor_1 = require("./interceptors/create-facility.interceptor");
const auth_role_decorator_1 = require("../auths/decorators/auth-role.decorator");
const auth_role_enum_1 = require("../auths/enums/auth-role.enum");
const create_facility_dto_1 = require("./dtos/requests/create-facility.dto");
const sport_licenses_dto_1 = require("./dtos/requests/sport-licenses.dto");
const active_person_decorator_1 = require("../auths/decorators/active-person.decorator");
let FacilityController = class FacilityController {
    facilityService;
    constructor(facilityService) {
        this.facilityService = facilityService;
    }
    create(createFacilityDto, files, sportLicensesDto, ownerId) {
        return this.facilityService.create(createFacilityDto, files.images, ownerId, files.certificate[0], files.licenses, sportLicensesDto.sportIds);
    }
    getAll() {
        return this.facilityService.getAll();
    }
    getDropDownInfo(ownerId) {
        return this.facilityService.getDropDownInfo(ownerId);
    }
    getByOwner(ownerId) {
        return this.facilityService.getByOwner(ownerId);
    }
    getByFacility(facilityId) {
        return this.facilityService.getByFacility(facilityId);
    }
    updateName(facilityId, name, certificate, ownerId) {
        return this.facilityService.updateName(facilityId, name, certificate, ownerId);
    }
    updateCertificate(facilityId, certificate, ownerId) {
        return this.facilityService.updateCertificate(facilityId, certificate, ownerId);
    }
    updateLicense(facilityId, sportId, license, ownerId) {
        return this.facilityService.updateLicense(facilityId, sportId, license, ownerId);
    }
};
exports.FacilityController = FacilityController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'create new facility and field groups and fields (role: owner)',
    }),
    (0, common_1.Post)('create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'images', maxCount: 10 },
        { name: 'licenses', maxCount: 7 },
        { name: 'certificate', maxCount: 1 },
    ]), create_facility_interceptor_1.CreateFacilityInterceptor),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.OWNER),
    __param(0, (0, common_1.Body)('facilityInfo')),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)('sportLicenses')),
    __param(3, (0, active_person_decorator_1.ActivePerson)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_facility_dto_1.CreateFacilityDto, Object, sport_licenses_dto_1.SportLicensesDto, String]),
    __metadata("design:returntype", void 0)
], FacilityController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'get all facilities (role: none)',
    }),
    (0, common_1.Get)('all'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.NONE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FacilityController.prototype, "getAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'get drop down info of facility (role: owner)',
    }),
    (0, common_1.Get)('drop-down'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.OWNER),
    __param(0, (0, active_person_decorator_1.ActivePerson)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FacilityController.prototype, "getDropDownInfo", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'get all facility by owner (role: none)',
    }),
    (0, common_1.Get)('owner/:ownerId'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.NONE),
    __param(0, (0, common_1.Param)('ownerId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FacilityController.prototype, "getByOwner", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'get facility by id (role: none)',
    }),
    (0, common_1.Get)(':facilityId'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.NONE),
    __param(0, (0, common_1.Param)('facilityId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FacilityController.prototype, "getByFacility", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'update name of facility (role: owner)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'name',
        type: 'string',
        example: 'Tên cơ sở mới',
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('certificate')),
    (0, common_1.Put)(':facilityId/update-name'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.OWNER),
    __param(0, (0, common_1.Param)('facilityId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('name')),
    __param(2, (0, common_1.UploadedFile)()),
    __param(3, (0, active_person_decorator_1.ActivePerson)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, String]),
    __metadata("design:returntype", void 0)
], FacilityController.prototype, "updateName", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'update certificate in facility (role: owner)',
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('certificate')),
    (0, common_1.Put)(':facilityId/update-certificate'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.OWNER),
    __param(0, (0, common_1.Param)('facilityId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, active_person_decorator_1.ActivePerson)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", void 0)
], FacilityController.prototype, "updateCertificate", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'update license inn facility (role: owner)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sportId',
        type: 'number',
        example: 1,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('license')),
    (0, common_1.Put)(':facilityId/update-license'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.OWNER),
    __param(0, (0, common_1.Param)('facilityId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)('sportId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.UploadedFile)()),
    __param(3, (0, active_person_decorator_1.ActivePerson)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object, String]),
    __metadata("design:returntype", void 0)
], FacilityController.prototype, "updateLicense", null);
exports.FacilityController = FacilityController = __decorate([
    (0, common_1.Controller)('facility'),
    __metadata("design:paramtypes", [facility_service_1.FacilityService])
], FacilityController);
//# sourceMappingURL=facility.controller.js.map
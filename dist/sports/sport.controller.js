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
exports.SportController = void 0;
const common_1 = require("@nestjs/common");
const sport_service_1 = require("./sport.service");
const create_sport_dto_1 = require("./dtos/requests/create-sport.dto");
const auth_role_decorator_1 = require("../auths/decorators/auth-role.decorator");
const auth_role_enum_1 = require("../auths/enums/auth-role.enum");
const swagger_1 = require("@nestjs/swagger");
let SportController = class SportController {
    sportService;
    constructor(sportService) {
        this.sportService = sportService;
    }
    create(createSportDto) {
        return this.sportService.create(createSportDto);
    }
    getAll() {
        return this.sportService.getAll();
    }
};
exports.SportController = SportController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'create sport (role: admin)',
    }),
    (0, common_1.Post)(),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sport_dto_1.CreateSportDto]),
    __metadata("design:returntype", void 0)
], SportController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'get all sport (role: none)',
    }),
    (0, common_1.Get)('all'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.NONE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SportController.prototype, "getAll", null);
exports.SportController = SportController = __decorate([
    (0, common_1.Controller)('sport'),
    __metadata("design:paramtypes", [sport_service_1.SportService])
], SportController);
//# sourceMappingURL=sport.controller.js.map
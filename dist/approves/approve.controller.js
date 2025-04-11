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
exports.ApproveController = void 0;
const common_1 = require("@nestjs/common");
const approve_service_1 = require("./approve.service");
const swagger_1 = require("@nestjs/swagger");
const auth_role_decorator_1 = require("../auths/decorators/auth-role.decorator");
const auth_role_enum_1 = require("../auths/enums/auth-role.enum");
const reject_note_dto_1 = require("./dtos/reject-note.dto");
let ApproveController = class ApproveController {
    approveSerice;
    constructor(approveSerice) {
        this.approveSerice = approveSerice;
    }
    approve(approvalId) {
        return this.approveSerice.approve(approvalId);
    }
    reject(approvalId, rejectNoteDto) {
        return this.approveSerice.reject(approvalId, rejectNoteDto);
    }
    getAll() { }
};
exports.ApproveController = ApproveController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'approve the approval (role: admin)',
    }),
    (0, common_1.Post)(':approvalId/approve'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.ADMIN),
    __param(0, (0, common_1.Param)('approvalId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApproveController.prototype, "approve", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'reject the approval (role: admin)',
    }),
    (0, common_1.Post)(':approvalId/reject'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.ADMIN),
    __param(0, (0, common_1.Param)('approvalId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reject_note_dto_1.RejectNoteDto]),
    __metadata("design:returntype", void 0)
], ApproveController.prototype, "reject", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'get all approval (role: admin)',
    }),
    (0, common_1.Get)('all'),
    (0, auth_role_decorator_1.AuthRoles)(auth_role_enum_1.AuthRoleEnum.NONE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApproveController.prototype, "getAll", null);
exports.ApproveController = ApproveController = __decorate([
    (0, common_1.Controller)('approval'),
    __metadata("design:paramtypes", [approve_service_1.ApproveService])
], ApproveController);
//# sourceMappingURL=approve.controller.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApproveModule = void 0;
const common_1 = require("@nestjs/common");
const approve_controller_1 = require("./approve.controller");
const approve_service_1 = require("./approve.service");
const typeorm_1 = require("@nestjs/typeorm");
const approve_entity_1 = require("./approve.entity");
const approve_facility_provider_1 = require("./providers/approve-facility.provider");
const approve_facilaty_name_provider_1 = require("./providers/approve-facilaty-name.provider");
const approve_certificate_provider_1 = require("./providers/approve-certificate.provider");
const approvce_license_provider_1 = require("./providers/approvce-license.provider");
const facility_module_1 = require("../facilities/facility.module");
let ApproveModule = class ApproveModule {
};
exports.ApproveModule = ApproveModule;
exports.ApproveModule = ApproveModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([approve_entity_1.Approve]),
            (0, common_1.forwardRef)(() => facility_module_1.FacilityModule),
        ],
        controllers: [approve_controller_1.ApproveController],
        providers: [
            approve_service_1.ApproveService,
            approve_facility_provider_1.ApproveFacilityProvider,
            approve_facilaty_name_provider_1.ApproveFacilityNameProvider,
            approve_certificate_provider_1.ApproveCertificateProvider,
            approvce_license_provider_1.ApproveLicenseProvider,
        ],
        exports: [approve_service_1.ApproveService],
    })
], ApproveModule);
//# sourceMappingURL=approve.module.js.map
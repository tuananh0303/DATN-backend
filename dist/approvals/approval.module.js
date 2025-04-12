"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalModule = void 0;
const common_1 = require("@nestjs/common");
const approval_controller_1 = require("./approval.controller");
const approval_service_1 = require("./approval.service");
const typeorm_1 = require("@nestjs/typeorm");
const approval_entity_1 = require("./approval.entity");
const approval_facility_provider_1 = require("./providers/approval-facility.provider");
const approval_facility_name_provider_1 = require("./providers/approval-facility-name.provider");
const approval_certificate_provider_1 = require("./providers/approval-certificate.provider");
const approval_license_provider_1 = require("./providers/approval-license.provider");
const facility_module_1 = require("../facilities/facility.module");
const sport_module_1 = require("../sports/sport.module");
const license_module_1 = require("../licenses/license.module");
let ApprovalModule = class ApprovalModule {
};
exports.ApprovalModule = ApprovalModule;
exports.ApprovalModule = ApprovalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([approval_entity_1.Approval]),
            (0, common_1.forwardRef)(() => facility_module_1.FacilityModule),
            sport_module_1.SportModule,
            license_module_1.LicenseModule,
        ],
        controllers: [approval_controller_1.ApprovalController],
        providers: [
            approval_service_1.ApprovalService,
            approval_facility_provider_1.ApprovalFacilityProvider,
            approval_facility_name_provider_1.ApprovalFacilityNameProvider,
            approval_certificate_provider_1.ApprovalCertificateProvider,
            approval_license_provider_1.ApprovalLicenseProvider,
        ],
        exports: [approval_service_1.ApprovalService],
    })
], ApprovalModule);
//# sourceMappingURL=approval.module.js.map
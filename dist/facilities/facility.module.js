"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityModule = void 0;
const common_1 = require("@nestjs/common");
const facility_service_1 = require("./facility.service");
const facility_controller_1 = require("./facility.controller");
const typeorm_1 = require("@nestjs/typeorm");
const facility_entity_1 = require("./facility.entity");
const field_group_module_1 = require("../field-groups/field-group.module");
const person_module_1 = require("../people/person.module");
const certificate_module_1 = require("../certificates/certificate.module");
const license_module_1 = require("../licenses/license.module");
const cloud_uploader_module_1 = require("../cloud-uploader/cloud-uploader.module");
const approve_module_1 = require("../approves/approve.module");
let FacilityModule = class FacilityModule {
};
exports.FacilityModule = FacilityModule;
exports.FacilityModule = FacilityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([facility_entity_1.Facility]),
            (0, common_1.forwardRef)(() => field_group_module_1.FieldGroupModule),
            person_module_1.PersonModule,
            (0, common_1.forwardRef)(() => certificate_module_1.CertificateModule),
            (0, common_1.forwardRef)(() => license_module_1.LicenseModule),
            cloud_uploader_module_1.CloudUploaderModule,
            (0, common_1.forwardRef)(() => approve_module_1.ApproveModule),
        ],
        providers: [facility_service_1.FacilityService],
        controllers: [facility_controller_1.FacilityController],
        exports: [facility_service_1.FacilityService],
    })
], FacilityModule);
//# sourceMappingURL=facility.module.js.map
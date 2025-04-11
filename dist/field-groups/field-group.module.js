"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldGroupModule = void 0;
const common_1 = require("@nestjs/common");
const field_group_service_1 = require("./field-group.service");
const field_group_controller_1 = require("./field-group.controller");
const typeorm_1 = require("@nestjs/typeorm");
const field_group_entity_1 = require("./field-group.entity");
const field_module_1 = require("../fields/field.module");
const facility_module_1 = require("../facilities/facility.module");
const sport_module_1 = require("../sports/sport.module");
let FieldGroupModule = class FieldGroupModule {
};
exports.FieldGroupModule = FieldGroupModule;
exports.FieldGroupModule = FieldGroupModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([field_group_entity_1.FieldGroup]),
            (0, common_1.forwardRef)(() => field_module_1.FieldModule),
            (0, common_1.forwardRef)(() => facility_module_1.FacilityModule),
            sport_module_1.SportModule,
        ],
        providers: [field_group_service_1.FieldGroupService],
        controllers: [field_group_controller_1.FieldGroupController],
        exports: [field_group_service_1.FieldGroupService],
    })
], FieldGroupModule);
//# sourceMappingURL=field-group.module.js.map
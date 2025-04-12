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
exports.LicenseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const license_entity_1 = require("./license.entity");
const cloud_uploader_service_1 = require("../cloud-uploader/cloud-uploader.service");
const sport_service_1 = require("../sports/sport.service");
const typeorm_2 = require("@nestjs/typeorm");
let LicenseService = class LicenseService {
    cloudUploaderService;
    sportService;
    licenseRepository;
    constructor(cloudUploaderService, sportService, licenseRepository) {
        this.cloudUploaderService = cloudUploaderService;
        this.sportService = sportService;
        this.licenseRepository = licenseRepository;
    }
    async createWithTransaction(license, facility, sportId, manager) {
        const { secure_url } = await this.cloudUploaderService.upload(license);
        const sport = await this.sportService.findOneByIdWithTransaction(sportId, manager);
        const newLicense = manager.create(license_entity_1.License, {
            facility,
            sport,
            verified: String(secure_url),
        });
        return await manager.save(newLicense);
    }
    async findOneByIdWithTransaction(facilityId, sportId, manager) {
        return await manager
            .findOneOrFail(license_entity_1.License, {
            where: {
                sportId,
                facilityId,
            },
        })
            .catch(() => {
            throw new common_1.NotFoundException(`Not found license with sport ${sportId} of facility ${facilityId}`);
        });
    }
    async findOneById(facilityId, sportId) {
        return await this.licenseRepository
            .findOneOrFail({
            where: {
                sportId,
                facilityId,
            },
        })
            .catch(() => {
            throw new common_1.NotFoundException(`Not found license with sport ${sportId} of facility ${facilityId}`);
        });
    }
    async createNoUploadWithTransction(license, facility, sportId, manager) {
        const sport = await this.sportService.findOneByIdWithTransaction(sportId, manager);
        const newLicense = manager.create(license_entity_1.License, {
            facility,
            verified: license,
            sport,
        });
        return await manager.save(newLicense);
    }
};
exports.LicenseService = LicenseService;
exports.LicenseService = LicenseService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectRepository)(license_entity_1.License)),
    __metadata("design:paramtypes", [cloud_uploader_service_1.CloudUploaderService,
        sport_service_1.SportService,
        typeorm_1.Repository])
], LicenseService);
//# sourceMappingURL=license.service.js.map
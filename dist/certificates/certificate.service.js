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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificateService = void 0;
const common_1 = require("@nestjs/common");
const certificate_entity_1 = require("./certificate.entity");
const cloud_uploader_service_1 = require("../cloud-uploader/cloud-uploader.service");
let CertificateService = class CertificateService {
    cloudUploaderService;
    constructor(cloudUploaderService) {
        this.cloudUploaderService = cloudUploaderService;
    }
    async createWithTransaction(certificate, facility, manager) {
        const { secure_url } = await this.cloudUploaderService.upload(certificate);
        const newCertificate = manager.create(certificate_entity_1.Certificate, {
            facility,
            verified: String(secure_url),
        });
        return await manager.save(newCertificate);
    }
};
exports.CertificateService = CertificateService;
exports.CertificateService = CertificateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloud_uploader_service_1.CloudUploaderService])
], CertificateService);
//# sourceMappingURL=certificate.service.js.map
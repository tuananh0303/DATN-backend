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
exports.ServiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const facility_service_1 = require("../facilities/facility.service");
const service_entity_1 = require("./service.entity");
const sport_service_1 = require("../sports/sport.service");
const facility_status_enum_1 = require("../facilities/enums/facility-status.enum");
const license_service_1 = require("../licenses/license.service");
const typeorm_2 = require("@nestjs/typeorm");
let ServiceService = class ServiceService {
    dataSource;
    facilityService;
    sportService;
    licenseService;
    serviceRepository;
    constructor(dataSource, facilityService, sportService, licenseService, serviceRepository) {
        this.dataSource = dataSource;
        this.facilityService = facilityService;
        this.sportService = sportService;
        this.licenseService = licenseService;
        this.serviceRepository = serviceRepository;
    }
    async createMany(createManyServicesDto, ownerId) {
        const facility = await this.facilityService.findOneByIdAndOwnerId(createManyServicesDto.facilityId, ownerId);
        await this.dataSource.transaction(async (manager) => {
            for (const service of createManyServicesDto.services) {
                await this.createWithTransaction(service, facility, manager);
            }
        });
        return {
            message: 'Create many services successful',
        };
    }
    async createWithTransaction(createServiceDto, facility, manager) {
        const sport = await this.sportService.findOneByIdWithTransaction(createServiceDto.sportId, manager);
        if (facility.status !== facility_status_enum_1.FacilityStatusEnum.ACTIVE) {
            throw new common_1.BadRequestException(`The facility ${facility.name} must be active`);
        }
        const license = await this.licenseService.findOneByIdWithTransaction(facility.id, createServiceDto.sportId, manager);
        if (!license.verified) {
            throw new common_1.BadRequestException("The license for this sport hasn't been verified yet.");
        }
        const service = manager.create(service_entity_1.Service, {
            ...createServiceDto,
            sport,
            facility,
        });
        return await manager.save(service);
    }
    async findOneByIdAndOwner(serviceId, ownerId, relations) {
        return await this.serviceRepository
            .findOneOrFail({
            where: {
                id: serviceId,
                facility: {
                    owner: {
                        id: ownerId,
                    },
                },
            },
            relations,
        })
            .catch(() => {
            throw new common_1.NotFoundException('Not found the service');
        });
    }
    async update(updateServiceDto, serviceId, ownerId) {
        const service = await this.findOneByIdAndOwner(serviceId, ownerId, [
            'facility',
        ]);
        if (updateServiceDto.name)
            service.name = updateServiceDto.name;
        if (updateServiceDto.amount)
            service.amount = updateServiceDto.amount;
        if (updateServiceDto.description)
            service.description = updateServiceDto.description;
        if (updateServiceDto.price)
            service.price = updateServiceDto.price;
        if (updateServiceDto.unit)
            service.unit = updateServiceDto.unit;
        try {
            await this.serviceRepository.save(service);
        }
        catch {
            throw new common_1.BadRequestException('An error occurred when update service');
        }
        return {
            message: 'Update service successful',
        };
    }
    async delete(serviceId, ownerId) {
        const service = await this.findOneByIdAndOwner(serviceId, ownerId);
        try {
            await this.serviceRepository.remove(service);
        }
        catch {
            throw new common_1.BadRequestException('An error occurred when delete the service');
        }
        return {
            message: 'Delete service successful',
        };
    }
    async getByFacility(facilityId) {
        const services = await this.serviceRepository.find({
            where: {
                facility: {
                    id: facilityId,
                },
            },
            relations: {
                sport: true,
            },
            order: {
                name: 'DESC',
            },
        });
        return services.map((service) => ({
            ...service,
            bookedCount: 0,
        }));
    }
};
exports.ServiceService = ServiceService;
exports.ServiceService = ServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, typeorm_2.InjectRepository)(service_entity_1.Service)),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        facility_service_1.FacilityService,
        sport_service_1.SportService,
        license_service_1.LicenseService,
        typeorm_1.Repository])
], ServiceService);
//# sourceMappingURL=service.service.js.map
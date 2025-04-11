import { IServiceService } from './iservice.service';
import { UUID } from 'crypto';
import { CreateManyServicesDto } from './dtos/requests/create-many-services.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { FacilityService } from 'src/facilities/facility.service';
import { Facility } from 'src/facilities/facility.entity';
import { CreateServiceDto } from './dtos/requests/create-service.dto';
import { Service } from './service.entity';
import { SportService } from 'src/sports/sport.service';
import { LicenseService } from 'src/licenses/license.service';
import { UpdateServiceDto } from './dtos/requests/update-service.dto';
export declare class ServiceService implements IServiceService {
    private readonly dataSource;
    private readonly facilityService;
    private readonly sportService;
    private readonly licenseService;
    private readonly serviceRepository;
    constructor(dataSource: DataSource, facilityService: FacilityService, sportService: SportService, licenseService: LicenseService, serviceRepository: Repository<Service>);
    createMany(createManyServicesDto: CreateManyServicesDto, ownerId: UUID): Promise<{
        message: string;
    }>;
    createWithTransaction(createServiceDto: CreateServiceDto, facility: Facility, manager: EntityManager): Promise<Service>;
    findOneByIdAndOwner(serviceId: number, ownerId: UUID, relations?: string[]): Promise<Service>;
    update(updateServiceDto: UpdateServiceDto, serviceId: number, ownerId: UUID): Promise<{
        message: string;
    }>;
    delete(serviceId: number, ownerId: UUID): Promise<{
        message: string;
    }>;
    getByFacility(facilityId: UUID): Promise<any[]>;
}

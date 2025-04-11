import { ServiceService } from './service.service';
import { CreateManyServicesDto } from './dtos/requests/create-many-services.dto';
import { UUID } from 'crypto';
import { UpdateServiceDto } from './dtos/requests/update-service.dto';
export declare class ServiceController {
    private readonly serviceService;
    constructor(serviceService: ServiceService);
    createMany(createManyServicesDto: CreateManyServicesDto, ownerId: UUID): Promise<{
        message: string;
    }>;
    update(serviceId: number, updateServiceDto: UpdateServiceDto, ownerId: UUID): Promise<{
        message: string;
    }>;
    delete(serviceId: number, ownerId: UUID): Promise<{
        message: string;
    }>;
    getByFacility(facilityId: UUID): Promise<any[]>;
}

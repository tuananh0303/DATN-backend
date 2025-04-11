import { CreateServiceDto } from './create-service.dto';
import { UUID } from 'crypto';
export declare class CreateManyServicesDto {
    facilityId: UUID;
    services: CreateServiceDto[];
}

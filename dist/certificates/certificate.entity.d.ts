import { UUID } from 'crypto';
import { Facility } from 'src/facilities/facility.entity';
export declare class Certificate {
    facilityId: UUID;
    verified?: string;
    temporary?: string;
    facility: Facility;
}

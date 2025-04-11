import { UUID } from 'crypto';
import { Facility } from 'src/facilities/facility.entity';
import { Sport } from 'src/sports/sport.entity';
export declare class License {
    facilityId: UUID;
    sportId: number;
    verified?: string;
    facility: Facility;
    sport: Sport;
}

import { Facility } from 'src/facilities/facility.entity';
import { Sport } from 'src/sports/sport.entity';
import { ServiceTypeEnum } from './enums/service-type.enum';
import { AdditionalService } from 'src/additional-services/additional-service.entity';
export declare class Service {
    id: number;
    name: string;
    price: number;
    type: ServiceTypeEnum;
    description?: string;
    amount: number;
    bookedCount: number;
    unit: string;
    sport: Sport;
    facility: Facility;
    additionalServices: AdditionalService[];
    beforeUpdateAndInsert(): void;
}

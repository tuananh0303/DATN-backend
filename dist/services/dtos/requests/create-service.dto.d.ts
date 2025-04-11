import { ServiceTypeEnum } from '../../enums/service-type.enum';
export declare class CreateServiceDto {
    name: string;
    price: number;
    description?: string;
    amount: number;
    sportId: number;
    unit: string;
    type: ServiceTypeEnum;
}

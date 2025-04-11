import { CreateFieldDto } from 'src/fields/dtos/requests/create-field.dto';
export declare class CreateFieldGroupDto {
    name: string;
    dimension: string;
    surface: string;
    basePrice: number;
    peakStartTime1?: string;
    peakEndTime1?: string;
    priceIncrease1?: number;
    peakStartTime2?: string;
    peakEndTime2?: string;
    priceIncrease2?: number;
    peakStartTime3?: string;
    peakEndTime3?: string;
    priceIncrease3?: number;
    sportIds: number[];
    fields: CreateFieldDto[];
}

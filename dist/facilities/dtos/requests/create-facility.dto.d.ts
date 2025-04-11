import { CreateFieldGroupDto } from 'src/field-groups/dtos/request/create-field-group.dto';
export declare class CreateFacilityDto {
    name: string;
    description?: string;
    openTime1: string;
    closeTime1: string;
    openTime2?: string;
    closeTime2?: string;
    openTime3?: string;
    closeTime3?: string;
    location: string;
    fieldGroups: CreateFieldGroupDto[];
}

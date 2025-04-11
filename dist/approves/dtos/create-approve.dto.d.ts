import { ApproveTypeEnum } from '../enums/approve-type.enum';
export declare class CreateApproveDto {
    type: ApproveTypeEnum;
    name?: string;
    certificate?: string;
    license?: string;
    sportId?: string;
}

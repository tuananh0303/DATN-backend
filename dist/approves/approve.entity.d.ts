import { UUID } from 'crypto';
import { ApproveTypeEnum } from './enums/approve-type.enum';
import { ApproveStatusEnum } from './enums/approve-status.enum';
import { Facility } from 'src/facilities/facility.entity';
export declare class Approve {
    id: UUID;
    type: ApproveTypeEnum;
    status: ApproveStatusEnum;
    name?: string;
    certifiacte?: string;
    license?: string;
    sportId?: string;
    note?: string;
    facility: Facility;
}

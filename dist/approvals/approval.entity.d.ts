import { UUID } from 'crypto';
import { ApprovalTypeEnum } from './enums/approval-type.enum';
import { ApprovalStatusEnum } from './enums/approval-status.enum';
import { Facility } from 'src/facilities/facility.entity';
import { Sport } from 'src/sports/sport.entity';
export declare class Approval {
    id: UUID;
    type: ApprovalTypeEnum;
    status: ApprovalStatusEnum;
    name?: string;
    certifiacte?: string;
    license?: string;
    sport?: Sport;
    note?: string;
    createdAt: Date;
    updatedAt: Date;
    facility: Facility;
}

import { UUID } from 'crypto';
import { Approve } from '../approve.entity';
import { CreateApproveDto } from '../dtos/create-approve.dto';
import { ApproveAbstract } from './approve.abstract';
import { RejectNoteDto } from '../dtos/reject-note.dto';
export declare class ApproveLicenseProvider implements ApproveAbstract {
    create(facilityId: UUID, createApproveDto: CreateApproveDto): Promise<Approve>;
    approve(approve: Approve): Promise<{
        message: string;
    }>;
    reject(approve: Approve, rejectNoteDto: RejectNoteDto): Promise<{
        message: string;
    }>;
}

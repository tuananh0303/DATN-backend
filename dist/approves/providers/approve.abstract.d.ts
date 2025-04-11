import { UUID } from 'crypto';
import { Approve } from '../approve.entity';
import { CreateApproveDto } from '../dtos/create-approve.dto';
import { RejectNoteDto } from '../dtos/reject-note.dto';
export declare abstract class ApproveAbstract {
    abstract create(facilityId: UUID, createApproveDto: CreateApproveDto): Promise<Approve>;
    abstract approve(approve: Approve): Promise<{
        message: string;
    }>;
    abstract reject(approve: Approve, rejectNoteDto: RejectNoteDto): Promise<{
        message: string;
    }>;
}

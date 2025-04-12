import { ApprovalService } from './approval.service';
import { UUID } from 'crypto';
import { RejectNoteDto } from './dtos/reject-note.dto';
export declare class ApprovalController {
    private readonly approveSerice;
    constructor(approveSerice: ApprovalService);
    approve(approvalId: UUID): Promise<{
        message: string;
    }>;
    reject(approvalId: UUID, rejectNoteDto: RejectNoteDto): Promise<{
        message: string;
    }>;
    getAll(): Promise<import("./approval.entity").Approval[]>;
    delete(approvalId: UUID, ownerId: UUID): Promise<{
        message: string;
    }>;
}

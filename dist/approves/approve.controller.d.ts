import { ApproveService } from './approve.service';
import { UUID } from 'crypto';
import { RejectNoteDto } from './dtos/reject-note.dto';
export declare class ApproveController {
    private readonly approveSerice;
    constructor(approveSerice: ApproveService);
    approve(approvalId: UUID): Promise<{
        message: string;
    }>;
    reject(approvalId: UUID, rejectNoteDto: RejectNoteDto): Promise<{
        message: string;
    }>;
    getAll(): void;
}

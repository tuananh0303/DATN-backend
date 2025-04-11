import { UUID } from 'crypto';
import { Approve } from '../approve.entity';
import { CreateApproveDto } from '../dtos/create-approve.dto';
import { ApproveAbstract } from './approve.abstract';
import { Repository } from 'typeorm';
import { RejectNoteDto } from '../dtos/reject-note.dto';
export declare class ApproveCertificateProvider implements ApproveAbstract {
    private readonly approveRepository;
    constructor(approveRepository: Repository<Approve>);
    create(facilityId: UUID, createApproveDto: CreateApproveDto): Promise<Approve>;
    approve(approve: Approve): Promise<{
        message: string;
    }>;
    reject(approve: Approve, rejectNoteDto: RejectNoteDto): Promise<{
        message: string;
    }>;
}

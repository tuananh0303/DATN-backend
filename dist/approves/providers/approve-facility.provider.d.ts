import { ApproveAbstract } from './approve.abstract';
import { UUID } from 'crypto';
import { Approve } from '../approve.entity';
import { CreateApproveDto } from '../dtos/create-approve.dto';
import { Repository } from 'typeorm';
import { FacilityService } from 'src/facilities/facility.service';
import { RejectNoteDto } from '../dtos/reject-note.dto';
export declare class ApproveFacilityProvider implements ApproveAbstract {
    private readonly approveRepository;
    private readonly facilityService;
    constructor(approveRepository: Repository<Approve>, facilityService: FacilityService);
    create(facilityId: UUID, createApproveDto: CreateApproveDto): Promise<Approve>;
    approve(approve: Approve): Promise<{
        message: string;
    }>;
    reject(approve: Approve, rejectNoteDto: RejectNoteDto): Promise<{
        message: string;
    }>;
}

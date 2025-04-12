import { ApprovalAbstract } from './approval.abstract';
import { UUID } from 'crypto';
import { Approval } from '../approval.entity';
import { CreateApprovalDto } from '../dtos/create-approval.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { FacilityService } from 'src/facilities/facility.service';
import { RejectNoteDto } from '../dtos/reject-note.dto';
export declare class ApprovalFacilityProvider implements ApprovalAbstract {
    private readonly approveRepository;
    private readonly facilityService;
    private readonly dataSource;
    constructor(approveRepository: Repository<Approval>, facilityService: FacilityService, dataSource: DataSource);
    createWithTransaction(facilityId: UUID, createApprovalDto: CreateApprovalDto, manager: EntityManager): Promise<Approval>;
    approve(approve: Approval): Promise<{
        message: string;
    }>;
    reject(approval: Approval, rejectNoteDto: RejectNoteDto): Promise<{
        message: string;
    }>;
}

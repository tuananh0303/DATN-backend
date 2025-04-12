import { UUID } from 'crypto';
import { Approval } from '../approval.entity';
import { CreateApprovalDto } from '../dtos/create-approval.dto';
import { ApprovalAbstract } from './approval.abstract';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { RejectNoteDto } from '../dtos/reject-note.dto';
import { FacilityService } from 'src/facilities/facility.service';
export declare class ApprovalCertificateProvider implements ApprovalAbstract {
    private readonly approveRepository;
    private readonly facilityService;
    private readonly dataSource;
    constructor(approveRepository: Repository<Approval>, facilityService: FacilityService, dataSource: DataSource);
    createWithTransaction(facilityId: UUID, createApprovalDto: CreateApprovalDto, manager: EntityManager): Promise<Approval>;
    approve(approval: Approval): Promise<{
        message: string;
    }>;
    reject(approval: Approval, rejectNoteDto: RejectNoteDto): Promise<{
        message: string;
    }>;
}

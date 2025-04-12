import { ApprovalAbstract } from './approval.abstract';
import { UUID } from 'crypto';
import { Approval } from '../approval.entity';
import { CreateApprovalDto } from '../dtos/create-approval.dto';
import { RejectNoteDto } from '../dtos/reject-note.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { FacilityService } from 'src/facilities/facility.service';
export declare class ApprovalFacilityNameProvider implements ApprovalAbstract {
    private readonly facilityService;
    private readonly dataSource;
    private readonly approvalRepository;
    constructor(facilityService: FacilityService, dataSource: DataSource, approvalRepository: Repository<Approval>);
    createWithTransaction(facilityId: UUID, createApprovalDto: CreateApprovalDto, manager: EntityManager): Promise<Approval>;
    approve(approval: Approval): Promise<{
        message: string;
    }>;
    reject(approval: Approval, rejectNoteDto: RejectNoteDto): Promise<{
        message: string;
    }>;
}

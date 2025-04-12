import { UUID } from 'crypto';
import { Approval } from '../approval.entity';
import { CreateApprovalDto } from '../dtos/create-approval.dto';
import { ApprovalAbstract } from './approval.abstract';
import { RejectNoteDto } from '../dtos/reject-note.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { SportService } from 'src/sports/sport.service';
import { FacilityService } from 'src/facilities/facility.service';
import { LicenseService } from 'src/licenses/license.service';
export declare class ApprovalLicenseProvider implements ApprovalAbstract {
    private readonly sportService;
    private readonly facilityService;
    private readonly dataSource;
    private readonly approvalRepository;
    private readonly licenseService;
    constructor(sportService: SportService, facilityService: FacilityService, dataSource: DataSource, approvalRepository: Repository<Approval>, licenseService: LicenseService);
    createWithTransaction(facilityId: UUID, createApprovalDto: CreateApprovalDto, manager: EntityManager): Promise<Approval>;
    approve(approval: Approval): Promise<{
        message: string;
    }>;
    reject(approval: Approval, rejectNoteDto: RejectNoteDto): Promise<{
        message: string;
    }>;
}

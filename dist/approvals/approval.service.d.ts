import { UUID } from 'crypto';
import { CreateApprovalDto } from './dtos/create-approval.dto';
import { EntityManager, Repository } from 'typeorm';
import { ApprovalFacilityProvider } from './providers/approval-facility.provider';
import { ApprovalFacilityNameProvider } from './providers/approval-facility-name.provider';
import { ApprovalCertificateProvider } from './providers/approval-certificate.provider';
import { ApprovalLicenseProvider } from './providers/approval-license.provider';
import { ApprovalTypeEnum } from './enums/approval-type.enum';
import { RejectNoteDto } from './dtos/reject-note.dto';
import { IApprovalService } from './iapproval.service';
import { Approval } from './approval.entity';
export declare class ApprovalService implements IApprovalService {
    private readonly approveRepository;
    private readonly approvalFacilityProvider;
    private readonly approvalFacilityNameProvider;
    private readonly approvalCertificateProvider;
    private readonly approvalLicenseProvider;
    constructor(approveRepository: Repository<Approval>, approvalFacilityProvider: ApprovalFacilityProvider, approvalFacilityNameProvider: ApprovalFacilityNameProvider, approvalCertificateProvider: ApprovalCertificateProvider, approvalLicenseProvider: ApprovalLicenseProvider);
    createWithTransaction(facilityId: UUID, approvalType: ApprovalTypeEnum, createApprovalDto: CreateApprovalDto, manager: EntityManager): Promise<Approval>;
    approve(approvalId: UUID): Promise<{
        message: string;
    }>;
    reject(approvalId: UUID, rejectNoteDto: RejectNoteDto): Promise<{
        message: string;
    }>;
    findOneById(approveId: UUID): Promise<Approval>;
    getAll(): Promise<Approval[]>;
    delete(approvalId: UUID, ownerId: UUID): Promise<{
        message: string;
    }>;
}

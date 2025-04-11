import { IApproveService } from './iapprove.service';
import { UUID } from 'crypto';
import { Approve } from './approve.entity';
import { CreateApproveDto } from './dtos/create-approve.dto';
import { Repository } from 'typeorm';
import { ApproveFacilityProvider } from './providers/approve-facility.provider';
import { ApproveFacilityNameProvider } from './providers/approve-facilaty-name.provider';
import { ApproveCertificateProvider } from './providers/approve-certificate.provider';
import { ApproveLicenseProvider } from './providers/approvce-license.provider';
import { RejectNoteDto } from './dtos/reject-note.dto';
export declare class ApproveService implements IApproveService {
    private readonly approveRepository;
    private readonly approveFacilityProvider;
    private readonly approveFacilityNameProvider;
    private readonly approveCertificateProvider;
    private readonly approveLicenseProvider;
    constructor(approveRepository: Repository<Approve>, approveFacilityProvider: ApproveFacilityProvider, approveFacilityNameProvider: ApproveFacilityNameProvider, approveCertificateProvider: ApproveCertificateProvider, approveLicenseProvider: ApproveLicenseProvider);
    create(facilityId: UUID, createApproveDto: CreateApproveDto): Promise<Approve>;
    approve(approveId: UUID): Promise<{
        message: string;
    }>;
    reject(approveId: UUID, rejectNoteDto: RejectNoteDto): Promise<{
        message: string;
    }>;
    findOneById(approveId: UUID): Promise<Approve>;
    getAll(): Promise<Approve[]>;
}

import { IFacilityService } from './ifacility.service';
import { UUID } from 'crypto';
import { Facility } from './facility.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateFacilityDto } from './dtos/requests/create-facility.dto';
import { PersonService } from 'src/people/person.service';
import { FieldGroupService } from 'src/field-groups/field-group.service';
import { CertificateService } from 'src/certificates/certificate.service';
import { LicenseService } from 'src/licenses/license.service';
import { CloudUploaderService } from 'src/cloud-uploader/cloud-uploader.service';
import { ApproveService } from 'src/approves/approve.service';
export declare class FacilityService implements IFacilityService {
    private readonly facilityRepository;
    private readonly dataSource;
    private readonly personService;
    private readonly fieldGroupService;
    private readonly certificateService;
    private readonly licenseService;
    private readonly cloudUploaderService;
    private readonly approveService;
    constructor(facilityRepository: Repository<Facility>, dataSource: DataSource, personService: PersonService, fieldGroupService: FieldGroupService, certificateService: CertificateService, licenseService: LicenseService, cloudUploaderService: CloudUploaderService, approveService: ApproveService);
    findOneByIdAndOwnerId(facilityId: UUID, ownerId: UUID): Promise<Facility>;
    create(createFacilityDto: CreateFacilityDto, images: Express.Multer.File[], ownerId: UUID, certificate: Express.Multer.File, licenses?: Express.Multer.File[], sportIds?: number[]): Promise<{
        message: string;
    }>;
    getAll(): Promise<any[]>;
    getDropDownInfo(ownerId: UUID): Promise<any[]>;
    getByOwner(ownerId: UUID): Promise<any[]>;
    getByFacility(facilityId: UUID): Promise<Facility>;
    findOneById(facilityId: UUID): Promise<Facility>;
    approve(facility: Facility): Promise<Facility>;
    reject(facility: Facility): Promise<Facility>;
}

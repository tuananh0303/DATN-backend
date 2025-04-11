import { ILicenseService } from './ilicense.service';
import { Facility } from 'src/facilities/facility.entity';
import { EntityManager, Repository } from 'typeorm';
import { License } from './license.entity';
import { CloudUploaderService } from 'src/cloud-uploader/cloud-uploader.service';
import { SportService } from 'src/sports/sport.service';
import { UUID } from 'crypto';
export declare class LicenseService implements ILicenseService {
    private readonly cloudUploaderService;
    private readonly sportService;
    private readonly licenseRepository;
    constructor(cloudUploaderService: CloudUploaderService, sportService: SportService, licenseRepository: Repository<License>);
    createWithTransaction(license: Express.Multer.File, facility: Facility, sportId: number, manager: EntityManager): Promise<License>;
    findOneByIdWithTransaction(facilityId: UUID, sportId: number, manager: EntityManager): Promise<License>;
    findOneById(facilityId: UUID, sportId: number): Promise<License>;
}

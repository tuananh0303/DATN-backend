import { ICertificateService } from './icertificate.service';
import { Certificate } from './certificate.entity';
import { EntityManager } from 'typeorm';
import { CloudUploaderService } from 'src/cloud-uploader/cloud-uploader.service';
import { Facility } from 'src/facilities/facility.entity';
export declare class CertificateService implements ICertificateService {
    private readonly cloudUploaderService;
    constructor(cloudUploaderService: CloudUploaderService);
    createWithTransaction(certificate: Express.Multer.File, facility: Facility, manager: EntityManager): Promise<Certificate>;
}

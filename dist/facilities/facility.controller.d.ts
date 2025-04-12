import { FacilityService } from './facility.service';
import { CreateFacilityDto } from './dtos/requests/create-facility.dto';
import { SportLicensesDto } from './dtos/requests/sport-licenses.dto';
import { UUID } from 'crypto';
export declare class FacilityController {
    private readonly facilityService;
    constructor(facilityService: FacilityService);
    create(createFacilityDto: CreateFacilityDto, files: {
        images: Express.Multer.File[];
        certificate: Express.Multer.File[];
        licenses?: Express.Multer.File[];
    }, sportLicensesDto: SportLicensesDto, ownerId: UUID): Promise<{
        message: string;
    }>;
    getAll(): Promise<any[]>;
    getDropDownInfo(ownerId: UUID): Promise<any[]>;
    getByOwner(ownerId: UUID): Promise<any[]>;
    getByFacility(facilityId: UUID): Promise<import("./facility.entity").Facility>;
    updateName(facilityId: UUID, name: string, certificate: Express.Multer.File, ownerId: UUID): Promise<{
        message: string;
    }>;
    updateCertificate(facilityId: UUID, certificate: Express.Multer.File, ownerId: UUID): Promise<{
        message: string;
    }>;
    updateLicense(facilityId: UUID, sportId: number, license: Express.Multer.File, ownerId: UUID): Promise<{
        message: string;
    }>;
}

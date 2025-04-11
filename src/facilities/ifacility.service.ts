import { UUID } from 'crypto';
import { Facility } from './facility.entity';
import { CreateFacilityDto } from './dtos/requests/create-facility.dto';

export interface IFacilityService {
  findOneByIdAndOwnerId(facilityId: UUID, ownerId: UUID): Promise<Facility>;

  create(
    createFacilityDto: CreateFacilityDto,
    images: Express.Multer.File[],
    ownerId: UUID,
    certificate: Express.Multer.File,
    licenses?: Express.Multer.File[],
    sportIds?: number[],
  ): Promise<{ message: string }>;

  getAll(): Promise<any[]>;

  getDropDownInfo(ownerId: UUID): Promise<any[]>;

  getByOwner(ownerId: UUID): Promise<any[]>;

  getByFacility(facilityId: UUID): Promise<Facility>;

  findOneById(facilityId: UUID): Promise<Facility>;

  approve(facility: Facility): Promise<Facility>;

  reject(facility: Facility): Promise<Facility>;
}

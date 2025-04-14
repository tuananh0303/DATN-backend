import { UUID } from 'crypto';
import { CreateManyServicesDto } from './dtos/requests/create-many-services.dto';
import { CreateServiceDto } from './dtos/requests/create-service.dto';
import { Facility } from 'src/facilities/facility.entity';
import { EntityManager } from 'typeorm';
import { Service } from './service.entity';
import { UpdateServiceDto } from './dtos/requests/update-service.dto';
import { GetAvailableFieldInFacilityDto } from 'src/field-groups/dtos/request/get-available-field-in-facility.dto';

export interface IServiceService {
  createMany(
    createManyServicesDto: CreateManyServicesDto,
    ownerId: UUID,
  ): Promise<{ message: string }>;

  createWithTransaction(
    createServiceDto: CreateServiceDto,
    facility: Facility,
    manager: EntityManager,
  ): Promise<Service>;

  update(
    updateServiceDto: UpdateServiceDto,
    serviceId: number,
    ownerId: UUID,
  ): Promise<{ message: string }>;

  findOneByIdAndOwner(serviceId: number, ownerId: UUID): Promise<Service>;

  delete(serviceId: number, ownerId: UUID): Promise<{ message: string }>;

  getByFacility(facilityId: UUID): Promise<any[]>;

  findOneByIdWithTransaction(
    serviceId: number,
    manager: EntityManager,
    relations?: string[],
  ): Promise<Service>;

  getAvailableServiceInFacility(
    facilityId: UUID,
    getAvailableServiceInFacilityDto: GetAvailableFieldInFacilityDto,
  ): Promise<any>;

  addBookedCound(bookingId: UUID): Promise<any>;
}

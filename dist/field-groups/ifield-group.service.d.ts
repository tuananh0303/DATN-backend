import { UUID } from 'crypto';
import { FieldGroup } from './field-group.entity';
import { CreateManyFieldGroupsDto } from './dtos/request/craete-many-field-groups.dto';
import { CreateFieldGroupDto } from './dtos/request/create-field-group.dto';
import { EntityManager } from 'typeorm';
import { Facility } from 'src/facilities/facility.entity';
import { UpdateFieldGroupDto } from './dtos/request/update-field-group.dto';
export interface IFieldGroupService {
    findOneByIdAndOwnerId(fieldGroupId: UUID, ownerId: UUID): Promise<FieldGroup>;
    createMany(createManyFieldGroupsDto: CreateManyFieldGroupsDto, facilityId: UUID, ownerId: UUID): Promise<{
        message: string;
    }>;
    createWithTransaction(createFieldGroupDto: CreateFieldGroupDto, facility: Facility, manager: EntityManager): Promise<FieldGroup>;
    update(updateFieldGroupDto: UpdateFieldGroupDto, fieldGroupId: UUID, ownerId: UUID): Promise<{
        message: string;
    }>;
    delete(fieldGroupId: UUID, ownerId: UUID): Promise<{
        message: string;
    }>;
    getByFacilityId(facilityId: UUID): Promise<FieldGroup[]>;
}

import { IFieldGroupService } from './ifield-group.service';
import { UUID } from 'crypto';
import { FieldGroup } from './field-group.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreateManyFieldGroupsDto } from './dtos/request/craete-many-field-groups.dto';
import { FieldService } from 'src/fields/field.service';
import { FacilityService } from 'src/facilities/facility.service';
import { CreateFieldGroupDto } from './dtos/request/create-field-group.dto';
import { Facility } from 'src/facilities/facility.entity';
import { UpdateFieldGroupDto } from './dtos/request/update-field-group.dto';
import { SportService } from 'src/sports/sport.service';
export declare class FieldGroupService implements IFieldGroupService {
    private readonly fieldGroupRepository;
    private readonly fieldService;
    private readonly facilityService;
    private readonly dataSource;
    private readonly sportService;
    constructor(fieldGroupRepository: Repository<FieldGroup>, fieldService: FieldService, facilityService: FacilityService, dataSource: DataSource, sportService: SportService);
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

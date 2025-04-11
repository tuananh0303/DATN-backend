import { FieldGroupService } from './field-group.service';
import { CreateManyFieldGroupsDto } from './dtos/request/craete-many-field-groups.dto';
import { UUID } from 'crypto';
import { UpdateFieldGroupDto } from './dtos/request/update-field-group.dto';
export declare class FieldGroupController {
    private readonly fieldGroupService;
    constructor(fieldGroupService: FieldGroupService);
    createMany(createManyFieldGroupsDto: CreateManyFieldGroupsDto, facilityId: UUID, ownerId: UUID): Promise<{
        message: string;
    }>;
    update(fieldGroupId: UUID, updateFieldGroupDto: UpdateFieldGroupDto, ownerId: UUID): Promise<{
        message: string;
    }>;
    delete(fieldGroupId: UUID, ownerId: UUID): Promise<{
        message: string;
    }>;
    getByFacilityId(facilityId: UUID): Promise<import("./field-group.entity").FieldGroup[]>;
}

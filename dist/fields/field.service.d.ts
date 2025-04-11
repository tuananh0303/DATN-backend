import { IFieldService } from './ifield.service';
import { UUID } from 'crypto';
import { CreateManyFieldsDto } from './dtos/requests/create-many-fields';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Field } from './field.entity';
import { FieldGroupService } from 'src/field-groups/field-group.service';
import { FieldGroup } from 'src/field-groups/field-group.entity';
import { CreateFieldDto } from './dtos/requests/create-field.dto';
import { UpdateFieldDto } from './dtos/requests/update-field.dto';
export declare class FieldService implements IFieldService {
    private readonly fieldRepositoy;
    private readonly fieldGroupService;
    private readonly dataSource;
    constructor(fieldRepositoy: Repository<Field>, fieldGroupService: FieldGroupService, dataSource: DataSource);
    findOneById(fieldId: number, relations?: string[]): Promise<Field>;
    createMany(createManyFieldsDto: CreateManyFieldsDto, fieldGroupId: UUID, ownerId: UUID): Promise<{
        message: string;
    }>;
    createWithTransaction(createFieldDto: CreateFieldDto, fieldGroup: FieldGroup, manager: EntityManager): Promise<Field>;
    findOneByIdAndOnwerId(id: number, ownerId: UUID): Promise<Field>;
    update(updateFieldDto: UpdateFieldDto, ownerId: UUID): Promise<{
        message: string;
    }>;
    delete(fieldId: number, ownerId: UUID): Promise<{
        message: string;
    }>;
}

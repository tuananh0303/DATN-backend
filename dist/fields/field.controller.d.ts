import { FieldService } from './field.service';
import { CreateManyFieldsDto } from './dtos/requests/create-many-fields';
import { UUID } from 'crypto';
import { UpdateFieldDto } from './dtos/requests/update-field.dto';
export declare class FieldController {
    private readonly fieldService;
    constructor(fieldService: FieldService);
    craeteMany(createManyFieldsDto: CreateManyFieldsDto, fieldGroupId: UUID, ownerId: UUID): Promise<{
        message: string;
    }>;
    update(updateFieldDto: UpdateFieldDto, ownerId: UUID): Promise<{
        message: string;
    }>;
    delete(fieldId: number, ownerID: UUID): Promise<{
        message: string;
    }>;
}

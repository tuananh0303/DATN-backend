import { UUID } from 'crypto';
import { PersonService } from './person.service';
import { UpdatePersonDto } from './dtos/requests/update-person.dto';
export declare class PersonController {
    private readonly personService;
    constructor(personService: PersonService);
    getAll(): void;
    getMyInfor(personId: UUID): Promise<import("./person.entity").Person>;
    updateAvata(image: Express.Multer.File, personId: UUID): Promise<import("./dtos/responses/message-response.dto").MessageResponseDto>;
    updateInfo(updatePersonDto: UpdatePersonDto, personId: UUID): Promise<import("./dtos/responses/message-response.dto").MessageResponseDto>;
}

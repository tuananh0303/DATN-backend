import { IPersonService } from './iperson.service';
import { Person } from './person.entity';
import { EntityManager, Repository } from 'typeorm';
import { RegisterDto } from 'src/auths/dtos/requests/register.dto';
import { UUID } from 'crypto';
import { MessageResponseDto } from './dtos/responses/message-response.dto';
import { CloudUploaderService } from 'src/cloud-uploader/cloud-uploader.service';
import { UpdatePersonDto } from './dtos/requests/update-person.dto';
export declare class PersonService implements IPersonService {
    private readonly personRepository;
    private readonly cloudUploaderService;
    constructor(personRepository: Repository<Person>, cloudUploaderService: CloudUploaderService);
    findOneByEmail(email: string): Promise<Person>;
    createOne(registerDto: RegisterDto): Promise<Person>;
    findOneById(personId: UUID): Promise<Person>;
    getAll(): Promise<Person[]>;
    updateAvatatar(image: Express.Multer.File, personId: UUID): Promise<MessageResponseDto>;
    updateInfo(updatePersonDto: UpdatePersonDto, personId: UUID): Promise<MessageResponseDto>;
    findOneByIdWithTransaction(personId: UUID, manage: EntityManager): Promise<Person>;
}

import { ISportService } from './isport.service';
import { CreateSportDto } from './dtos/requests/create-sport.dto';
import { MessageResponseDto } from './dtos/responses/message-response.dto';
import { EntityManager, Repository } from 'typeorm';
import { Sport } from './sport.entity';
export declare class SportService implements ISportService {
    private readonly sportRepository;
    constructor(sportRepository: Repository<Sport>);
    create(createSportDto: CreateSportDto): Promise<MessageResponseDto>;
    getAll(): Promise<Sport[]>;
    findManyByIds(ids: number[]): Promise<Sport[]>;
    findOneByIdWithTransaction(sportId: number, manager: EntityManager): Promise<Sport>;
    findOneById(sportId: number): Promise<Sport>;
}

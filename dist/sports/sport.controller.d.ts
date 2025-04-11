import { SportService } from './sport.service';
import { CreateSportDto } from './dtos/requests/create-sport.dto';
export declare class SportController {
    private readonly sportService;
    constructor(sportService: SportService);
    create(createSportDto: CreateSportDto): Promise<import("./dtos/responses/message-response.dto").MessageResponseDto>;
    getAll(): Promise<import("./sport.entity").Sport[]>;
}

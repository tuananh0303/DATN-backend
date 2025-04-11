"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const sport_entity_1 = require("./sport.entity");
const typeorm_2 = require("@nestjs/typeorm");
let SportService = class SportService {
    sportRepository;
    constructor(sportRepository) {
        this.sportRepository = sportRepository;
    }
    async create(createSportDto) {
        try {
            const sport = this.sportRepository.create(createSportDto);
            await this.sportRepository.save(sport);
        }
        catch {
            throw new common_1.BadRequestException('Error occur when create new sport');
        }
        return {
            message: 'Create sport successful',
        };
    }
    async getAll() {
        return await this.sportRepository.find({
            order: {
                id: 'ASC',
            },
        });
    }
    async findManyByIds(ids) {
        return this.sportRepository.find({
            where: {
                id: (0, typeorm_1.In)(ids),
            },
        });
    }
    async findOneByIdWithTransaction(sportId, manager) {
        return await manager
            .findOneOrFail(sport_entity_1.Sport, {
            where: {
                id: sportId,
            },
        })
            .catch(() => {
            throw new common_1.NotFoundException(`Not found sport by id: ${sportId}`);
        });
    }
    async findOneById(sportId) {
        return this.sportRepository
            .findOneOrFail({
            where: {
                id: sportId,
            },
        })
            .catch(() => {
            throw new common_1.NotFoundException(`Not found the sport by id: ${sportId}`);
        });
    }
};
exports.SportService = SportService;
exports.SportService = SportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(sport_entity_1.Sport)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], SportService);
//# sourceMappingURL=sport.service.js.map
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
exports.PersonService = void 0;
const common_1 = require("@nestjs/common");
const person_entity_1 = require("./person.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const person_role_enum_1 = require("./enums/person-role.enum");
const cloud_uploader_service_1 = require("../cloud-uploader/cloud-uploader.service");
let PersonService = class PersonService {
    personRepository;
    cloudUploaderService;
    constructor(personRepository, cloudUploaderService) {
        this.personRepository = personRepository;
        this.cloudUploaderService = cloudUploaderService;
    }
    async findOneByEmail(email) {
        const person = await this.personRepository
            .findOneOrFail({
            where: {
                email,
            },
        })
            .catch(() => {
            throw new common_1.NotFoundException(`Person not found with email ${email}`);
        });
        return person;
    }
    async createOne(registerDto) {
        if (registerDto.role === person_role_enum_1.PersonRoleEnum.ADMIN) {
            throw new common_1.NotAcceptableException('You do not have permission to register admin acoount');
        }
        try {
            const person = this.personRepository.create(registerDto);
            return await this.personRepository.save(person);
        }
        catch (error) {
            throw new common_1.BadRequestException(String(error));
        }
    }
    async findOneById(personId) {
        const person = await this.personRepository
            .findOneOrFail({
            where: {
                id: personId,
            },
        })
            .catch(() => {
            throw new common_1.NotFoundException(`Not found person with id: ${personId}`);
        });
        return person;
    }
    async getAll() {
        return await this.personRepository.find();
    }
    async updateAvatatar(image, personId) {
        if (!image.mimetype.includes('image')) {
            throw new common_1.BadRequestException('Avatar must be images');
        }
        const person = await this.findOneById(personId);
        try {
            const { secure_url } = await this.cloudUploaderService.upload(image);
            person.avatarUrl = String(secure_url);
            await this.personRepository.save(person);
        }
        catch {
            throw new common_1.BadRequestException('Error occur when update avatar');
        }
        return {
            message: 'Update avatar successful',
        };
    }
    async updateInfo(updatePersonDto, personId) {
        const person = await this.findOneById(personId);
        if (updatePersonDto.name)
            person.name = updatePersonDto.name;
        if (updatePersonDto.email) {
            const personWithEmail = await this.personRepository.findOneBy({
                email: updatePersonDto.email,
            });
            if (personWithEmail) {
                throw new common_1.BadRequestException('Email already exists');
            }
            person.email = updatePersonDto.email;
        }
        if (updatePersonDto.phoneNumber)
            person.phoneNumber = updatePersonDto.phoneNumber;
        if (updatePersonDto.gender)
            person.gender = updatePersonDto.gender;
        if (updatePersonDto.dob)
            person.dob = updatePersonDto.dob;
        if (updatePersonDto.bankAccount)
            person.bankAccount = updatePersonDto.bankAccount;
        try {
            await this.personRepository.save(person);
        }
        catch {
            throw new common_1.BadRequestException('Erro occur when update info');
        }
        return {
            message: 'Update info successful',
        };
    }
    async findOneByIdWithTransaction(personId, manage) {
        return manage
            .findOneOrFail(person_entity_1.Person, {
            where: {
                id: personId,
            },
        })
            .catch(() => {
            throw new common_1.NotFoundException(`Not found person with id: ${personId}`);
        });
    }
};
exports.PersonService = PersonService;
exports.PersonService = PersonService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(person_entity_1.Person)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        cloud_uploader_service_1.CloudUploaderService])
], PersonService);
//# sourceMappingURL=person.service.js.map
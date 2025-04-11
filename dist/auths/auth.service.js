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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const person_service_1 = require("../people/person.service");
const hash_provider_1 = require("./providers/hash.provider");
const config_1 = require("@nestjs/config");
const token_provider_1 = require("./providers/token.provider");
const common_1 = require("@nestjs/common");
let AuthService = class AuthService {
    personService;
    hashProvider;
    configService;
    tokenProvider;
    constructor(personService, hashProvider, configService, tokenProvider) {
        this.personService = personService;
        this.hashProvider = hashProvider;
        this.configService = configService;
        this.tokenProvider = tokenProvider;
    }
    async login(loginDto) {
        const person = await this.personService.findOneByEmail(loginDto.email);
        const isEqual = await this.hashProvider.comparePassword(loginDto.password, person.password);
        if (!isEqual) {
            throw new common_1.UnauthorizedException('Wrong email or password');
        }
        const payload = {
            role: person.role,
        };
        const accessToken = await this.tokenProvider.generate(person.id, this.configService.get('JWT_SECRET'), this.configService.get('JWT_EXPIRE'), payload);
        const refreshToken = await this.tokenProvider.generate(person.id, this.configService.get('JWT_SECRET_REFRESH'), this.configService.get('JWT_EXPIRE_REFRESH'));
        return {
            accessToken,
            refreshToken,
        };
    }
    async register(registerDto) {
        const hashPassword = await this.hashProvider.hashPassword(registerDto.password);
        registerDto.password = hashPassword;
        await this.personService.createOne(registerDto);
        return {
            message: 'Create successfull',
        };
    }
    async refresheToken(refreshTokenDto) {
        const { sub } = await this.tokenProvider.verify(refreshTokenDto.refreshToken, this.configService.get('JWT_SECRET_REFRESH'));
        const person = await this.personService.findOneById(sub);
        const payload = { role: person.role };
        const accessToken = await this.tokenProvider.generate(sub, this.configService.get('JWT_SECRET'), this.configService.get('JWT_EXPIRE'), payload);
        return {
            accessToken,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [person_service_1.PersonService,
        hash_provider_1.HashProvider,
        config_1.ConfigService,
        token_provider_1.TokenProvider])
], AuthService);
//# sourceMappingURL=auth.service.js.map
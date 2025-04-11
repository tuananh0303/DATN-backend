import { PersonService } from 'src/people/person.service';
import { LoginDto } from './dtos/requests/login.dto';
import { RefreshTokenDto } from './dtos/requests/refresh-token.dto';
import { RegisterDto } from './dtos/requests/register.dto';
import { LoginResponseDto } from './dtos/responses/login-response.dto';
import { MessageReponseDto } from './dtos/responses/message-response.dto';
import { RefreshTokenReponseDto } from './dtos/responses/refresh-token-response.dto';
import { IAuthService } from './iauth.service';
import { HashProvider } from './providers/hash.provider';
import { ConfigService } from '@nestjs/config';
import { TokenProvider } from './providers/token.provider';
export declare class AuthService implements IAuthService {
    private readonly personService;
    private readonly hashProvider;
    private readonly configService;
    private readonly tokenProvider;
    constructor(personService: PersonService, hashProvider: HashProvider, configService: ConfigService, tokenProvider: TokenProvider);
    login(loginDto: LoginDto): Promise<LoginResponseDto>;
    register(registerDto: RegisterDto): Promise<MessageReponseDto>;
    refresheToken(refreshTokenDto: RefreshTokenDto): Promise<RefreshTokenReponseDto>;
}

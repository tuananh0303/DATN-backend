import { LoginDto } from './dtos/requests/login.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/requests/register.dto';
import { RefreshTokenDto } from './dtos/requests/refresh-token.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<import("./dtos/responses/login-response.dto").LoginResponseDto>;
    register(registerDto: RegisterDto): Promise<import("./dtos/responses/message-response.dto").MessageReponseDto>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<import("./dtos/responses/refresh-token-response.dto").RefreshTokenReponseDto>;
}

import { JwtService } from '@nestjs/jwt';
import { UUID } from 'crypto';
export declare class TokenProvider {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generate<T>(personId: UUID, secret: string, expiresIn: string, payload?: T): Promise<string>;
    verify<T extends object>(token: string, secret: string): Promise<T>;
}

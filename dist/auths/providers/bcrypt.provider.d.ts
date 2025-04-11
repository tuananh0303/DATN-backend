import { HashProvider } from './hash.provider';
export declare class BcryptProvider implements HashProvider {
    hashPassword(password: string | Buffer): Promise<string>;
    comparePassword(password: string | Buffer, encryptedPassword: string): Promise<boolean>;
}

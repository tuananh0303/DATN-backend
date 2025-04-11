export declare abstract class HashProvider {
    abstract hashPassword(password: string | Buffer): Promise<string>;
    abstract comparePassword(password: string | Buffer, encryptedPassword: string): Promise<boolean>;
}

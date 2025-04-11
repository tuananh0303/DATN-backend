import { PersonRoleEnum } from 'src/people/enums/person-role.enum';
export declare class RegisterDto {
    email: string;
    phoneNumber?: string;
    name: string;
    password: string;
    role: PersonRoleEnum;
}

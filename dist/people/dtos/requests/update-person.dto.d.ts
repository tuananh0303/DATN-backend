import { GenderEnum } from '../../enums/gender.enum';
export declare class UpdatePersonDto {
    name?: string;
    email?: string;
    phoneNumber?: string;
    gender?: GenderEnum;
    dob?: Date;
    bankAccount?: string;
}

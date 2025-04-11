import { GenderEnum } from './enums/gender.enum';
import { UUID } from 'crypto';
import { PersonRoleEnum } from './enums/person-role.enum';
import { Facility } from 'src/facilities/facility.entity';
import { Booking } from 'src/bookings/booking.entity';
export declare class Person {
    id: UUID;
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
    avatarUrl?: string;
    gender?: GenderEnum;
    dob?: Date;
    bankAccount?: string;
    role: PersonRoleEnum;
    createdAt: Date;
    updatedAt: Date;
    facilities: Facility[];
    bookings: Booking[];
    afterLoad(): void;
}

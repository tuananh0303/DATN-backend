import { FieldStatusEnum } from './enums/field-status.enum';
import { FieldGroup } from 'src/field-groups/field-group.entity';
import { BookingSlot } from 'src/booking-slots/booking-slot.entity';
export declare class Field {
    id: number;
    name: string;
    status: FieldStatusEnum;
    fieldGroup: FieldGroup;
    bookingSlots: BookingSlot[];
}

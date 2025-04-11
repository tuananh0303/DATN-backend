import { IBookingService } from './ibooking.service';
import { UUID } from 'crypto';
import { Booking } from './booking.entity';
import { CreateDraftBookingDto } from './dtos/requests/create-draft-booking.dto';
import { DataSource } from 'typeorm';
import { FieldService } from 'src/fields/field.service';
import { PersonService } from 'src/people/person.service';
import { SportService } from 'src/sports/sport.service';
export declare class BookingService implements IBookingService {
    private readonly fieldService;
    private readonly dataSource;
    private readonly personService;
    private readonly sportService;
    constructor(fieldService: FieldService, dataSource: DataSource, personService: PersonService, sportService: SportService);
    createDraft(createDraftBookingDto: CreateDraftBookingDto, playerId: UUID): Promise<Booking>;
    private checkOverlapBookingsWithTransaction;
}

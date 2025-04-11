import { Body, Controller } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateDraftBookingDto } from './dtos/requests/create-draft-booking.dto';
import { ActivePerson } from 'src/auths/decorators/active-person.decorator';
import { UUID } from 'crypto';

@Controller('booking')
export class BookingController {
  constructor(
    /**
     * inject BookingService
     */
    private readonly bookingService: BookingService,
  ) {}

  public createDraft(
    @Body() createDraftBookingDto: CreateDraftBookingDto,
    @ActivePerson('sub') playerId: UUID,
  ) {
    return this.bookingService.createDraft(createDraftBookingDto, playerId);
  }
}

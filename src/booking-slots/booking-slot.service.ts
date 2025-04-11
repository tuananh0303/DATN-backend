import { Injectable } from '@nestjs/common';
import { IBookingSlotService } from './ibooking-slot.service';

@Injectable()
export class BookingSlotService implements IBookingSlotService {
  hello() {
    throw new Error('Method not implemented.');
  }
}

import { Booking } from 'src/bookings/booking.entity';
import { EntityManager } from 'typeorm';
import { AdditionalService } from './additional-service.entity';
import { Service } from 'src/services/service.entity';

export interface IAdditionalServiceService {
  createWithTransaction(
    booking: Booking,
    service: Service,
    quantity: number,
    manager: EntityManager,
  ): Promise<AdditionalService>;
}

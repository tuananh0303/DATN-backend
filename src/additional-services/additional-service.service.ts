import { BadRequestException, Injectable } from '@nestjs/common';
import { IAdditionalServiceService } from './iadditional-service.service';
import { Booking } from 'src/bookings/booking.entity';
import { EntityManager } from 'typeorm';
import { AdditionalService } from './additional-service.entity';
import { Service } from 'src/services/service.entity';

@Injectable()
export class AdditionalServiceService implements IAdditionalServiceService {
  constructor() {}

  public async createWithTransaction(
    booking: Booking,
    service: Service,
    quantity: number,
    manager: EntityManager,
  ): Promise<AdditionalService> {
    if (booking.sport.id !== service.sport.id) {
      throw new BadRequestException('The service not support for this booking');
    }

    const additionalService = manager.create(AdditionalService, {
      service,
      quantity,
      booking,
    });

    return await manager.save(additionalService);
  }
}

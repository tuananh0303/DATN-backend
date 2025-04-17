import { forwardRef, Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { FieldModule } from 'src/fields/field.module';
import { PersonModule } from 'src/people/person.module';
import { SportModule } from 'src/sports/sport.module';
import { BookingSlotModule } from 'src/booking-slots/booking-slot.module';
import { PaymentModule } from 'src/payments/payment.module';
import { ServiceModule } from 'src/services/service.module';
import { AdditionalServiceModule } from 'src/additional-services/additional-service.module';
import { FacilityModule } from 'src/facilities/facility.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    FieldModule,
    PersonModule,
    SportModule,
    BookingSlotModule,
    PaymentModule,
    forwardRef(() => ServiceModule),
    AdditionalServiceModule,
    FacilityModule,
  ],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}

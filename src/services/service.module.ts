import { forwardRef, Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { FacilityModule } from 'src/facilities/facility.module';
import { SportModule } from 'src/sports/sport.module';
import { LicenseModule } from 'src/licenses/license.module';
import { BookingModule } from 'src/bookings/booking.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service]),
    FacilityModule,
    SportModule,
    LicenseModule,
    forwardRef(() => BookingModule),
  ],
  providers: [ServiceService],
  controllers: [ServiceController],
  exports: [ServiceService],
})
export class ServiceModule {}

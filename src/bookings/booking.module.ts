import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { FieldModule } from 'src/fields/field.module';
import { PersonModule } from 'src/people/person.module';
import { SportModule } from 'src/sports/sport.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    FieldModule,
    PersonModule,
    SportModule,
  ],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}

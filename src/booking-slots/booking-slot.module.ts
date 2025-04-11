import { Module } from '@nestjs/common';
import { BookingSlotService } from './booking-slot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingSlot } from './booking-slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingSlot])],
  providers: [BookingSlotService],
  exports: [BookingSlotService],
})
export class BookingSlotModule {}

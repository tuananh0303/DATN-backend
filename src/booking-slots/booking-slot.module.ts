import { Module } from '@nestjs/common';
import { BookingSlotService } from './booking-slot.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingSlot } from './booking-slot.entity';
import { BookingSlotController } from './booking-slot.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BookingSlot])],
  providers: [BookingSlotService],
  exports: [BookingSlotService],
  controllers: [BookingSlotController],
})
export class BookingSlotModule {}

import { Module } from '@nestjs/common';
import { PlaymateController } from './playmate.controller';
import { PlaymateService } from './playmate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playmate } from './entities/playmate.entity';
import { PlaymateParticipant } from './entities/playmate-participant.entity';
import { BookingSlotModule } from 'src/booking-slots/booking-slot.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Playmate, PlaymateParticipant]),
    BookingSlotModule,
  ],
  controllers: [PlaymateController],
  providers: [PlaymateService],
  exports: [PlaymateService],
})
export class PlaymateModule {}

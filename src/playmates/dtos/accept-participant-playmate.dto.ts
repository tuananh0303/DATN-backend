import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class AcceptParticipantPlaymate {
  @ApiProperty({
    type: 'string',
  })
  @IsUUID()
  @IsNotEmpty()
  playerId: UUID;

  @ApiProperty({
    type: 'string',
  })
  @IsUUID()
  @IsNotEmpty()
  playmateId: UUID;
}

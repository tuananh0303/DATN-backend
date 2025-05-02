import { UUID } from 'crypto';
import { CreatePlaymateDto } from './dtos/create-playmate.dto';
import { UpdatePlaymateDto } from './dtos/update-playmate.dto';
import { Playmate } from './entities/playmate.entity';
import { AcceptParticipantPlaymate } from './dtos/accept-participant-playmate.dto';

export interface IPlaymateService {
  create(
    createPlaymateDto: CreatePlaymateDto,
    playerId: UUID,
  ): Promise<{ message: string }>;

  update(
    updatePlaymateDto: UpdatePlaymateDto,
    playerId: UUID,
  ): Promise<{ message: string }>;

  register(playmateId: UUID, playerId: UUID): Promise<{ message: string }>;

  getMany(): Promise<Playmate[]>;

  getDetail(playmateId: UUID): Promise<Playmate>;

  switchAccept(
    acceptParticipantPlaymate: AcceptParticipantPlaymate,
    playerId: UUID,
  ): Promise<{ message: string }>;
}

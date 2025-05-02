import { UUID } from 'crypto';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Playmate } from './playmate.entity';
import { Person } from 'src/people/person.entity';

@Entity()
export class PlaymateParticipant {
  @PrimaryColumn()
  playmateId: UUID;

  @PrimaryColumn()
  playerId: UUID;

  @ManyToOne(() => Playmate, (playmate) => playmate.participants, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'playmateId',
  })
  playmate: Playmate;

  @ManyToOne(() => Person, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'playerId',
  })
  player: Person;

  @Column({
    type: 'bool',
    default: false,
  })
  isAccept: boolean;
}

import { UUID } from 'crypto';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApproveTypeEnum } from './enums/approve-type.enum';
import { ApproveStatusEnum } from './enums/approve-status.enum';
import { Facility } from 'src/facilities/facility.entity';

@Entity()
export class Approve {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({
    type: 'enum',
    enum: ApproveTypeEnum,
    nullable: false,
  })
  type: ApproveTypeEnum;

  @Column({
    type: 'enum',
    enum: ApproveStatusEnum,
    default: ApproveStatusEnum.PENDING,
    nullable: false,
  })
  status: ApproveStatusEnum;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  name?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  certifiacte?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  license?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  sportId?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  note?: string;

  @ManyToOne(() => Facility, (facility) => facility.approves)
  @JoinColumn()
  facility: Facility;
}

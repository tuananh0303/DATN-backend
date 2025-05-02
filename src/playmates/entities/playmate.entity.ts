import { UUID } from 'crypto';
import { BookingSlot } from 'src/booking-slots/booking-slot.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PlaymatePaymentType } from '../enums/playmate-payment-type.enum';
import { PlaymateGenderEnum } from '../enums/playmate-gender.enum';
import { PlaymateLevelEnum } from '../enums/playmate-level.enum';
import { PlaymateParticipant } from './playmate-participant.entity';
import { BadRequestException } from '@nestjs/common';

@Entity()
export class Playmate {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({
    type: 'text',
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 255,
    array: true,
    nullable: true,
  })
  imagesUrl?: string[];

  @OneToOne(() => BookingSlot, (bookingSlot) => bookingSlot.playmate, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  bookingSlot: BookingSlot;

  @Column({
    type: 'text',
    nullable: true,
  })
  desciption?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  additionalInfo?: string;

  @Column({
    type: 'enum',
    enum: PlaymatePaymentType,
    nullable: false,
  })
  paymentType: PlaymatePaymentType;

  @Column({
    type: 'integer',
    nullable: true,
  })
  totalCost?: number;

  @Column({
    type: 'integer',
    nullable: true,
  })
  maleCost?: number;

  @Column({
    type: 'integer',
    nullable: true,
  })
  femaleCost?: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  detailOfCost?: string;

  @Column({
    type: 'bool',
    default: false,
  })
  isTeam: boolean;

  @Column({
    type: 'integer',
    nullable: false,
  })
  minParticipant: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
  maxParticipant: number;

  @Column({
    type: 'enum',
    enum: PlaymateGenderEnum,
    default: PlaymateGenderEnum.NONE,
  })
  gender: PlaymateGenderEnum;

  @Column({
    type: 'enum',
    enum: PlaymateLevelEnum,
    default: PlaymateLevelEnum.NONE,
  })
  level: PlaymateLevelEnum;

  @OneToMany(() => PlaymateParticipant, (participants) => participants.playmate)
  participants: PlaymateParticipant[];

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  beforeInsertAndUpdate() {
    if (this.paymentType === PlaymatePaymentType.TOTAL && !this.totalCost) {
      throw new BadRequestException('Miss total cost');
    }

    if (
      this.paymentType === PlaymatePaymentType.GENDER &&
      (!this.maleCost || !this.femaleCost)
    ) {
      throw new BadRequestException('Miss male or female cost');
    }

    if (this.minParticipant > this.maxParticipant) {
      throw new BadRequestException('wrong number of participant');
    }
  }
}

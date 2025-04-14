import { Booking } from 'src/bookings/booking.entity';
import { Field } from 'src/fields/field.entity';
import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BookingSlot {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({
    type: 'date',
  })
  date: Date;

  @ManyToOne(() => Field, (field) => field.bookingSlots, {
    nullable: false,
  })
  @JoinColumn()
  field: Field;

  @ManyToOne(() => Booking, (booking) => booking.bookingSlots, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  booking: Booking;

  @AfterLoad()
  afterLoad() {
    this.date = new Date(this.date);
  }
}

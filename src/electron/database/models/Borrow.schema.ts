import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BorrowRenovation } from './BorrowRenovation.schema';
import { TitlePublisher } from './TitlePublisher.schema';
import { User } from './User.schema';

@Entity()
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  borrow: Date;

  @Column()
  estimatedReturn: Date;

  @Column({ nullable: true })
  returnedAt: Date;

  @Column()
  status: number;

  @Column({ default: false })
  isReservation: boolean;

  @Column()
  titlePublisherId: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.borrows)
  user: User;

  @OneToMany(() => BorrowRenovation, (renovation) => renovation.borrow)
  renovations: BorrowRenovation[];

  @ManyToOne(() => TitlePublisher, (titlePublisher) => titlePublisher.borrow)
  titlePublisher: TitlePublisher;
}

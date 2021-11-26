import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BorrowRenovation } from './borrow_renovation.schema';
import { Publisher } from './publisher.schema';
import { User } from './user.schema';

@Entity()
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  edition: number;

  @Column({ type: 'date' })
  borrow: string;

  @Column({ type: 'date' })
  estimated_return: string;

  @Column({ type: 'date', nullable: true })
  returned_at: string;

  @Column()
  status: number;

  @Column({ default: false })
  is_reserva: boolean;

  @Column()
  title_publisher_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.borrows)
  user: User;

  @ManyToOne(() => Publisher, (publisher) => publisher.borrows)
  publisher: Publisher;

  @OneToMany(() => BorrowRenovation, (renovation) => renovation.borrow)
  renovations: BorrowRenovation[];
}

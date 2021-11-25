import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
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
  estimated_devolution: string;

  @Column({ type: 'date' })
  devolved_at: string;

  @Column()
  status: number;

  @Column()
  is_reserva: boolean;

  @Column()
  title_publisher_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.borrows)
  user: User;

  @ManyToOne(() => Publisher, (publisher) => publisher.borrows)
  publisher: Publisher;
}

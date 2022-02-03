import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Borrow } from './Borrow.schema';

@Entity()
export class BorrowRenovation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  borrowedAt: Date;

  @Column()
  renewedAt: Date;

  @Column({ nullable: true })
  returnedAt: Date;

  @Column()
  borrowId: number;

  @ManyToOne(() => Borrow, (borrow) => borrow.renovations)
  borrow: Borrow;
}

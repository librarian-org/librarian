import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Borrow } from './borrow.schema';

@Entity()
export class BorrowRenovation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'date'})
  borrowed_at: string;
  
  @Column({type: 'date'})
  renewed_at: string;
  
  @Column({type: 'date'})
  returned_at: string;
  
  @Column()
  borrow_id: number;

  @ManyToOne(() => Borrow, (borrow) => borrow.renovations)
  borrow: Borrow;
}

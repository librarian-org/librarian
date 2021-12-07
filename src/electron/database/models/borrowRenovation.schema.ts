import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Borrow } from './borrow.schema';

@Entity()
export class BorrowRenovation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'date'})
  borrowedAt: string;
  
  @Column({type: 'date'})
  renewedAt: string;
  
  @Column({type: 'date' , nullable: true})
  returnedAt: string;
  
  @Column()
  borrowId: number;

  @ManyToOne(() => Borrow, (borrow) => borrow.renovations)
  borrow: Borrow;
}

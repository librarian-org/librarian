import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Book
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

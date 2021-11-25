import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Program
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  screen: string;
}

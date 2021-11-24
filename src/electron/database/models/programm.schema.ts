import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Programm
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  screen: string;
}

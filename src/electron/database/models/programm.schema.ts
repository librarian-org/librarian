import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class programm
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  screen: string;
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TypeUser
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

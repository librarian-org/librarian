import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ContactType
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

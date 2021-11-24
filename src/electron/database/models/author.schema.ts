import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Author
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

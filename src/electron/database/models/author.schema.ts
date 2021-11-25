import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Title } from './title.schema';

@Entity()
export class Author
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Title, title => title.authors)
  titles: Title[];
}

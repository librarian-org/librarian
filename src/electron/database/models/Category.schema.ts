import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Title } from './Title.schema';

@Entity()
export class Category
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Title, title => title.titleCategories)
  titles: Title[];
}

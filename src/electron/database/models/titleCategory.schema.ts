import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './category.schema';
import { Title } from './title.schema';

@Entity()
export class TitleCategory
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titleId: number;

  @Column()
  categoryId: number;

  @ManyToOne(() => Title, title => title.categories)
  title: Title;

  @ManyToOne(() => Category, category => category.titles)
  category: Category;
}

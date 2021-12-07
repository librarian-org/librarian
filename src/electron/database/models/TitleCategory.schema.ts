import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './Category.schema';
import { Title } from './Title.schema';

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

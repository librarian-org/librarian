import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Category } from './Category.schema';
import { Author } from './Author.schema';
import { TitlePublisher } from './TitlePublisher.schema';

@Entity()
export class Title
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ISBN: string;

  @OneToMany(() => Category, category => category.titles)
  categories: Category[];

  @OneToMany(() => Author, author => author.titles)
  authors: Author[];

  @OneToMany(() => TitlePublisher, titlePublisher => titlePublisher.title)
  titlePublishers: TitlePublisher[];
}

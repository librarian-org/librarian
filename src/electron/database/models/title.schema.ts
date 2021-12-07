import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Category } from './category.schema';
import { Author } from './author.schema';
import { TitlePublisher } from './titlePublisher.schema';

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

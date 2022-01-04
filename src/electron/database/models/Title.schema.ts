import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TitlePublisher } from './TitlePublisher.schema';
import { TitleCategory } from './TitleCategory.schema';
import { TitleAuthor } from './TitleAuthor.schema';

@Entity()
export class Title
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ISBN: string;

  @OneToMany(() => TitleCategory, titleCategory => titleCategory.title)
  titleCategories: TitleCategory[];

  @OneToMany(() => TitleAuthor, titleAuthor => titleAuthor.title)
  titleAuthors: TitleAuthor[];

  @OneToMany(() => TitlePublisher, titlePublisher => titlePublisher.title)
  titlePublishers: TitlePublisher[];
}

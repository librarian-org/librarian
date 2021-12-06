import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Author } from './author.schema';
import { Title } from './title.schema';

@Entity()
export class TitleAuthor
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title_id: number;

  @Column()
  author_id: number;

  @ManyToOne(() => Title, title => title.authors)
  title: Title;

  @ManyToOne(() => Author, author => author.titles)
  author: Author;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Author } from './Author.schema';
import { Title } from './Title.schema';

@Entity()
export class TitleAuthor
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titleId: number;

  @Column()
  authorId: number;

  @ManyToOne(() => Title, title => title.authors)
  title: Title;

  @ManyToOne(() => Author, author => author.titles)
  author: Author;
}

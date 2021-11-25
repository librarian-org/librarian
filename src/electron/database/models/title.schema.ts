import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Author } from './author.schema';
import { TitlePublisher } from './title_publisher.schema';

@Entity()
export class Title
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ISBN: string;

  @OneToMany(() => Author, author => author.titles)
  authors: Author[];

  @OneToMany(() => TitlePublisher, titlePublisher => titlePublisher.title)
  titlePublishers: TitlePublisher[];
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
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

  @OneToMany(() => TitlePublisher, titlePublisher => titlePublisher.title)
  titlePublishers: TitlePublisher[];
}

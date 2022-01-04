import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Publisher } from './Publisher.schema';
import { Title } from './Title.schema';

@Entity()
export class TitlePublisher
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  edition: number;

  @Column({unique: true})
  classification: string;

  @Column({ type: 'date' })
  publishedAt: string;

  @Column()
  titleId: number;

  @Column()
  publisherId: number;

  @ManyToOne(() => Title, title => title.titlePublishers)
  title: Title;

  @ManyToOne(() => Publisher, publisher => publisher.titlePublishers)
  publisher: Publisher;
}
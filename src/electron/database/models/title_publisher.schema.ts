import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Publisher } from './publisher.schema';
import { Title } from './title.schema';

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
  published_at: string;

  @Column()
  title_id: number;

  @Column()
  publisher_id: number;

  @ManyToOne(() => Title, title => title.titlePublishers)
  title: Title;

  @ManyToOne(() => Publisher, publisher => publisher.titlePublishers)
  publisher: Publisher;
}

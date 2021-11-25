import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Borrow } from './borrow.schema';
import { TitlePublisher } from './title_publisher.schema';

@Entity()
export class Publisher
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => TitlePublisher, titlePublisher => titlePublisher.publisher)
  titlePublishers: TitlePublisher[];

  @OneToMany(() => Borrow, borrow => borrow.publisher)
  borrows: Borrow[];
}

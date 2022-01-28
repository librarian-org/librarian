import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TitlePublisher } from './TitlePublisher.schema';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => TitlePublisher, (titlePublisher) => titlePublisher.publisher)
  titlePublishers: TitlePublisher[];
}

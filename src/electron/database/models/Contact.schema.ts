import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ContactType } from './ContactType.schema';
import { User } from './User.schema';

@Entity()
export class Contact
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  info: string;

  @Column()
  userId: number;

  @Column()
  contentTypeId: number;

  @ManyToOne(() => User, user => user.contacts)
  user: User;

  @ManyToOne(() => ContactType, contactType => contactType.contacts)
  type: ContactType;

}

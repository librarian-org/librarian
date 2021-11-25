import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ContactType } from './contact_type.schema';
import { User } from './user.schema';

@Entity()
export class Contact
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  info: string;

  @Column()
  user_id: number;

  @Column()
  content_type_id: number;

  @ManyToOne(() => User, user => user.contacts)
  user: User;

  @ManyToOne(() => ContactType, contactType => contactType.contacts)
  type: ContactType;

}

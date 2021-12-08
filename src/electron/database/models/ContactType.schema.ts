import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Contact } from './Contact.schema';

@Entity()
export class ContactType
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Contact, contact => contact.type)
  contacts: Contact[];
}

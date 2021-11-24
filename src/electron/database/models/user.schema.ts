import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Contact } from './contact.schema';

@Entity()
export class User
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @OneToMany(() => Contact, contact => contact.user)
  contacts: Contact[];
}

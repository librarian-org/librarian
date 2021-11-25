import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Profile } from './profile.schema';
import { Contact } from './contact.schema';
import { TypeUser } from './type_user.schema';
import { Borrow } from './borrow.schema';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  language: string;

  @Column()
  notes: string;

  @Column()
  document: string;

  @Column()
  user_type_id: number;

  @ManyToOne(() => TypeUser, type => type.users)
  type: TypeUser;

  @OneToMany(() => Contact, contact => contact.user)
  contacts: Contact[];

  @OneToMany(() => Profile, profile => profile.users)
  profiles: Profile[];

  @OneToMany(() => Borrow, borrow => borrow.user)
  borrows: Borrow[];

}

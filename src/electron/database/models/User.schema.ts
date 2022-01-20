import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Profile } from './Profile.schema';
import { Contact } from './Contact.schema';
import { UserType } from './UserType.schema';
import { Borrow } from './Borrow.schema';
import { Address } from './Address.schema';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({unique: true})
  login: string;

  @Column({nullable: true})
  password: string;

  @Column()
  language: string;

  @Column({nullable: true})
  notes: string;

  @Column()
  document: string;

  @Column()
  userTypeId: number;

  @ManyToOne(() => UserType, type => type.users)
  type: UserType;

  @OneToMany(() => Contact, contact => contact.user)
  contacts: Contact[];

  @OneToMany(() => Profile, profile => profile.users)
  profiles: Profile[];

  @OneToMany(() => Borrow, borrow => borrow.user)
  borrows: Borrow[];

  @OneToMany(() => Address, address => address.user)
  addresses: Address[];

}

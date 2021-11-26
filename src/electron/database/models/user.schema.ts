import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Profile } from './profile.schema';
import { Contact } from './contact.schema';
import { TypeUser } from './type_user.schema';
import { Borrow } from './borrow.schema';
import { Address } from './address.schema';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable: true})
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
  user_type_id: number;

  @ManyToOne(() => TypeUser, type => type.users)
  type: TypeUser;

  @OneToMany(() => Contact, contact => contact.user)
  contacts: Contact[];

  @OneToMany(() => Profile, profile => profile.users)
  profiles: Profile[];

  @OneToMany(() => Borrow, borrow => borrow.user)
  borrows: Borrow[];

  @OneToMany(() => Address, address => address.user)
  addresses: Address[];

}

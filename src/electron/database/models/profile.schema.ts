import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Permission } from './permission.schema';
import { User } from './user.schema';

@Entity()
export class Profile
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
   
  @OneToMany(() => User, user => user.profiles)
  users: User[];

  @OneToMany(() => Permission, permission => permission.profile)
  permissions: Permission[];
}

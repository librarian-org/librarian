import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Permission } from './Permission.schema';
import { User } from './User.schema';

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

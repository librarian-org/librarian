import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Profile } from './profile.schema';
import { User } from './user.schema';

@Entity()
export class UserProfile
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  profile_id: number;

  @ManyToOne(() => User, user => user.profiles)
  user: User;

  @ManyToOne(() => Profile, profile => profile.users)
  profile: Profile;
}

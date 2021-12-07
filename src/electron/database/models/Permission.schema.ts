import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Profile } from './Profile.schema';
import { Program } from './Program.schema';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  save: boolean;

  @Column({ default: false })
  delete: boolean;

  @Column({ default: false })
  read: boolean;

  @Column()
  programId: number;

  @Column()
  profileId: number;

  @ManyToOne(() => Profile, (profile) => profile.permissions)
  profile: Profile;

  @ManyToOne(() => Program, (program) => program.permissions)
  program: Program;
}

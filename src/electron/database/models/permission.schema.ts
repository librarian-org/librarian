import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Profile } from './profile.schema';
import { Program } from './program.schema';

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
  program_id: number;

  @Column()
  profile_id: number;

  @ManyToOne(() => Profile, (profile) => profile.permissions)
  profile: Profile;

  @ManyToOne(() => Program, (program) => program.permissions)
  program: Program;
}

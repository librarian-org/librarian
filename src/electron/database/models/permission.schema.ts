import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Profile } from './profile.schema';
import { Program } from './program.schema';


@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  save: boolean;

  @Column()
  delete: boolean;

  @Column()
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

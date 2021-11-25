import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TypeUser } from './type_user.schema';

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
}

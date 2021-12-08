import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Permission } from './Permission.schema';

@Entity()
export class Program
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  screen: string;

  @OneToMany(() => Permission, permission => permission.program)
  permissions: Permission[];
}

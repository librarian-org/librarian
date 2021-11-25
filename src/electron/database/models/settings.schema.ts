import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Settings {
  @Column()
  days_return_date: number;

  @Column()
  backup_path: string;
}

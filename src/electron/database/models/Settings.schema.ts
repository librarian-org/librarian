import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Settings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  daysReturnDate: number;

  @Column()
  allowedRenovations: number;

  @Column()
  backupPath: string;
}

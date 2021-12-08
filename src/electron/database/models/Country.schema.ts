import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Region } from './Region.schema';

@Entity()
export class Country
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Region, region => region.country)
  regions: Region[];
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Region } from './region.schema';

@Entity()
export class City
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  region_id: number;

  @ManyToOne(() => Region, region => region.cities)
  region: Region;
}

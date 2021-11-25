import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Country } from './country.schema';

@Entity()
export class Region
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country_id: number;

  @ManyToOne(() => Country, country => country.regions)
  country: Country[];
}

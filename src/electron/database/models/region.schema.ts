import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { City } from './city.schema';
import { Country } from './country.schema';

@Entity()
export class Region
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  countryId: number;

  @ManyToOne(() => Country, country => country.regions)
  country: Country[];

  @OneToMany(() => City, city => city.region)
  cities: City[];
}

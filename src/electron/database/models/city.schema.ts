import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Address } from './address.schema';
import { Region } from './region.schema';

@Entity()
export class City
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  regionId: number;

  @ManyToOne(() => Region, region => region.cities)
  region: Region;

  @OneToMany(() => Address, address => address.city)
  addresses: Address[];
}

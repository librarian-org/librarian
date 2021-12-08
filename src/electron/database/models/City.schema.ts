import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Address } from './Address.schema';
import { Region } from './Region.schema';

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

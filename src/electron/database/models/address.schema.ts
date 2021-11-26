import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { City } from './city.schema';
import { User } from './user.schema';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  complement: string;

  @Column()
  zipcode: string;

  @Column()
  neighborhood: string;

  @Column()
  public_place: string;

  @Column()
  city_id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;

  @ManyToOne(() => City, (city) => city.addresses)
  city: City;
}

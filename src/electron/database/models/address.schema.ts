import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { City } from './city.schema';
import { User } from './user.schema';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  complement: string;

  @Column()
  zipcode: string;

  @Column()
  neighborhood: string;

  @Column()
  publicPlace: string;

  @Column()
  cityId: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;

  @ManyToOne(() => City, (city) => city.addresses)
  city: City;
}

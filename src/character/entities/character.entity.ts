import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { Location } from './location.entity';

@Entity()
export class Character {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  salary: number;

  @Column( { default: false })
  employee: boolean;

  @OneToOne(()=> Location, location => location.owner)
  @JoinColumn() 
    property: Location; 

  @ManyToMany(()=> Location, location=> location.favCharacters)
  @JoinTable() 
  favPlaces: Location[];

}

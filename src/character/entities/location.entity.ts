import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne, JoinColumn, ManyToMany } from 'typeorm';
import { Character } from './character.entity';

@Entity()
export class Location {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  cost: number;


  @OneToOne(()=> Character, character => character.property)
  owner: Character;

  @ManyToMany(()=> Character, character => character.favPlaces)
  favCharacters: Character[];

}
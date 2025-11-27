import { Character } from 'src/character/entities/character.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany } from 'typeorm';


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
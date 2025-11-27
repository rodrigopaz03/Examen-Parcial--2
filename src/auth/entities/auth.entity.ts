import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Token {

  @PrimaryGeneratedColumn('uuid')
  id: string;

 @Column('text', {
        unique: true,
        })
  token: string;

  @Column()
  reqLeft: number;

  @Column({ default: true })
  active: boolean;

}

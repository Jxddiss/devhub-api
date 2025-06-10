import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Projet } from './Projet';

@Entity('tags')
export class Tag {

  @PrimaryGeneratedColumn()
    id!: number;
    
  @Column({ type: 'varchar', length: 255 })
    name!: string;
    
  @ManyToMany(() => Projet, (projet) => projet.tags, {
    cascade: true,
  })

  @JoinTable()
    projets!: Projet[];
}

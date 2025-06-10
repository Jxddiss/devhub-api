import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Projet } from './Projet';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({ type: 'varchar', length: 255 })
    title!: string;
    
  @OneToMany(() => Projet, (projet) => projet.course)
    projets!: Projet[];
}

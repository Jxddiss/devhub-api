import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { User } from './User';

@Entity('projects')
export class Projet {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({ type: 'varchar', length: 255 })
    name!: string;

  @Column({ type: 'text' })
    description!: string;

  @Column({ type: 'varchar', length: 255 })
    previewImageUrl!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
    githubUrl?: string;
  
  @Column({ type: 'varchar', length: 255, nullable: true })
    gitLabUrl?: string;

  @Column({ type: 'varchar', length: 255 })
    liveUrl!: string;

  @Column({ type: 'varchar', length: 255 })
    demoUrl!: string;

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;

  @Column({ type: 'int', default: 0 })
    nbLikes!: number;

  @Column({ type: 'int', default: 0 })
    nbVues!: number;

  
  @ManyToOne(() => User, (user) => user.projetsEcrits)
  @JoinTable()
    auteur!: User;

  @ManyToMany(() => User, (user) => user.projets)
    colaborateurs!: User[];

}
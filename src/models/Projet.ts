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
import { Tag } from './Tag';

@Entity('projects')
export class Projet {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({ type: 'varchar', length: 255 })
    title!: string;

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

  @ManyToOne(() => User, (user) => user.projetsEcrits)
  @JoinTable()
    teacher!: User;

  @Column({ type: 'varchar', length: 255 })
    courseName!: string;

  @Column({ type: 'int', default: 0 })
    likes!: number;

  @Column({ type: 'int', default: 0 })
    views!: number;

  @ManyToOne(() => User, (user) => user.projetsEcrits)
  @JoinTable()
    author!: User;

  @ManyToMany(() => User, (user) => user.projets)
    collaborators!: User[];

  @ManyToMany(() => Tag, (tag) => tag.projets)
    tags!: Tag[];

  @ManyToMany(() => User, (user) => user.projets)
  @JoinTable()
    comments!: User[];


}
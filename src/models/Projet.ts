import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './User';
import { Tag } from './Tag';
import { Course } from './Course';
import { Comment } from './Comment';

@Entity('projects')
export class Projet {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({ type: 'varchar', length: 255 })
    title!: string;

  @Column({ type: 'text' })
    description!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
    previewImageUrl?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
    githubUrl?: string;
  
  @Column({ type: 'varchar', length: 255, nullable: true })
    gitLabUrl?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
    liveUrl?: string;

  @Column({ type: 'varchar', length: 255 })
    demoUrl!: string;

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.projetsEcrits)
    teacher?: User;

  @ManyToOne(() => Course, (course) => course.projets)
    course?: Course;

  @Column({ type: 'int', default: 0 })
    likes!: number;

  @Column({ type: 'int', default: 0 })
    views!: number;

  @ManyToOne(() => User, (user) => user.projetsEcrits)
    author!: User;

  @ManyToMany(() => User, (user) => user.projets)
    collaborators!: User[];

  @ManyToMany(() => Tag, (tag) => tag.projets)
    tags!: Tag[];

  @OneToMany(() => Comment, (comment) => comment.projet)
    comments!: Comment[];

}

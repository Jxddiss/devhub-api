import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './Comment';
import { Portfolio } from './Portfolio';
import { User } from './User';

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

  @Column({ type: 'varchar', length: 255, nullable: true })
    teacher?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
    course?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
    session?: string;

  @Column({ type: 'int', default: 0 })
    likes!: number;

  @Column({ type: 'int', default: 0 })
    views!: number;

  @ManyToOne(() => User, (user) => user.projetsEcrits, { eager: true })
    author!: User;

  @Column({ type: 'simple-array', nullable: true })
    collaborators?: string[];

  @Column({ type: 'simple-array', nullable: true })
    tags?: string[];

  @OneToMany(() => Comment, (comment) => comment.projet)
    comments!: Comment[];

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.projets)
    portfolio?: Portfolio;
}

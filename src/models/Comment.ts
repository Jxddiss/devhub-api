import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from './User';
import { Projet } from './Projet';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
    id!: number;
    
  @Column({ type: 'text' })
    text!: string;
    
  @CreateDateColumn()
    createdAt!: Date;
    
  @UpdateDateColumn()
    updatedAt!: Date;
    
  @ManyToOne(() => User, (user) => user.comments)
    author!: User;
    
  @ManyToOne(() => Projet, (projet) => projet.comments)
    projet!: Projet;

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  replies?: Comment[];

  @ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true, onDelete: 'CASCADE' })
    parentComment?: Comment;

}
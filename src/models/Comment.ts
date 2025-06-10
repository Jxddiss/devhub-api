import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Projet } from './Projet';
import { User } from './User';

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

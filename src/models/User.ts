import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Favorite } from './Favorite';
import { Portfolio } from './Portfolio';
import { Projet } from './Projet';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firebaseUid!: string;

  @Column({ type: 'varchar', length: 255 })
  lastName!: string;

  @Column({ type: 'varchar', length: 255 })
  firstName!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  username!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', nullable: true })
  avatar?: string;

  @Column({ type: 'varchar', nullable: true })
  banner?: string;

  @Column({ type: 'boolean', default: false })
  isLocked!: boolean;

  @Column({ type: 'boolean', default: false })
  isBanned!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToMany(() => Projet, projet => projet.collaborators, {
    cascade: true,
  })
  @JoinTable()
  projets!: Projet[];

  @OneToMany(() => Favorite, favorite => favorite.user, {
    cascade: true,
  })
  favorites!: Favorite[];

  @OneToMany(() => Projet, projet => projet.author, {
    cascade: true,
  })
  projetsEcrits!: Projet[];

  @OneToMany(() => Projet, projet => projet.author, {
    cascade: true,
  })
  comments!: Projet[];

  @OneToOne(() => Portfolio, portfolio => portfolio.user, {
    cascade: true,
  })
  portfolio?: Portfolio;

  @Column({ nullable: true, type: 'text' })
  refreshToken?: string | null;

  @Column({ nullable: true, type: 'timestamp' })
  refreshTokenExpiresAt?: Date | null;
}

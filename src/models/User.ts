import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
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

  @ManyToMany(() => Projet, (projet) => projet.colaborateurs, {
    cascade: true,
  })
  @JoinTable()
    projets!: Projet[];
  
  @OneToMany(() => Projet, (projet) => projet.auteur, {
    cascade: true,
  })
    projetsEcrits!: Projet[];
}
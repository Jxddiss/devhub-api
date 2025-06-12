import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Projet } from './Projet';
import { User } from './User';

@Entity('portfolios')
export class Portfolio {
  @PrimaryGeneratedColumn()
    id!: number;
  
  @Column({ type: 'varchar', length: 255 })
    template!: string;

  @OneToOne(() => User, (user) => user.portfolio)
  @JoinColumn({ name: 'user_id' })
    user!: User;

  @Column({ type: 'varchar', length: 50, default: 'active' })
    status!: 'active' | 'deleted' | 'archived';
  
  @Column({ type: 'varchar', length: 100, nullable: true })
    title?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
    hook?: string;

  @Column({ type: 'text', nullable: true })
    about?: string;

  @Column({ type: 'json', nullable: true })
    skills?: { name: string; level: number }[];

  @Column({ type: 'boolean', default: false })
    isPublic!: boolean;

  @Column({ type: 'varchar', length: 500, nullable: true })
    githubUrl?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
    linkedinUrl?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
    websiteUrl?: string;

  @Column({ type: 'json', nullable: true })
    projectIds?: number[];

  @Column({ type: 'varchar', length: 100, nullable: true })
    customDomain?: string;

  @Column({ type: 'json', nullable: true })
    customization?: Record<string, any>;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;

  @Column({ type: 'int', nullable: true })
    yearsOfExperience?: number;
    
  @Column({ type: 'varchar', length: 500, nullable: true })
    cvDownloadUrl?: string;
  
  @ManyToMany(() => Projet, (projet) => projet.portfolio)
    projets!: Projet[];

  @Column({ type: 'varchar', length: 255, nullable: true })
    jobTitle!: string;
  
}

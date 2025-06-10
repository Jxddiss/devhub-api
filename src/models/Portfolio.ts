import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity('portfolios')
export class Portfolio {
  @PrimaryGeneratedColumn()
    id!: number;
  
  @Column({ type: 'varchar', length: 255 })
    template!: string;

  @OneToOne(() => User, (user) => user.portfolio)
    user!: User;

}

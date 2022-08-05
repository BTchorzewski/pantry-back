import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PantryEntity } from './pantry.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    default: false,
  })
  isActivated: boolean;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @OneToMany((type) => PantryEntity, (pantry) => pantry.user)
  @JoinColumn()
  pantry: PantryEntity[];
}

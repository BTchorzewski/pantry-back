import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PantryEntity } from './pantry.entity';
import { UserEntity } from './user.entity';

@Entity()
export class ItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @Column()
  expiration: Date;

  @ManyToOne((type) => PantryEntity, (pantry) => pantry.items)
  pantry: PantryEntity;

  @ManyToOne(() => UserEntity, (user) => user.items)
  user: UserEntity;
}

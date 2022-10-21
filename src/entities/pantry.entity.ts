import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ItemEntity } from './item.entity';

@Entity()
export class PantryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne((type) => UserEntity, (user) => user.pantries)
  user: UserEntity;

  @OneToMany((type) => ItemEntity, (item) => item.pantry, { eager: true })
  @JoinTable()
  items: ItemEntity[];
}

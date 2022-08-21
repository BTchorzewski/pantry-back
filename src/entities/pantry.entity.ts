import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ItemEntity } from './item.entity';

@Entity()
export class PantryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne((type) => UserEntity, (user) => user.pantries)
  user: UserEntity;

  @OneToMany((type) => ItemEntity, (item) => item.pantry)
  items: ItemEntity[];
}

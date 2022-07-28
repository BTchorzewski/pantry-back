import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ItemEntity } from './item.entity';

@Entity()
export class PantryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne((type) => UserEntity, (user) => user.pantry)
  user: UserEntity;

  @OneToMany((type) => ItemEntity, (item) => item.pantry)
  items: ItemEntity[];
}

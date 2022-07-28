import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PantryEntity } from './pantry.entity';

@Entity()
export class ItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne((type) => PantryEntity, (pantry) => pantry.items)
  pantry: PantryEntity;
}

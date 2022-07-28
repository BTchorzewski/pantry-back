import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PantryEntity } from './pantry.entity';

@Entity()
export class ItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne((type) => PantryEntity, (pantry) => pantry.items)
  pantry: PantryEntity;
}

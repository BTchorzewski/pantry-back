import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PantryEntity } from '../../entities/pantry.entity';
import { ItemEntity } from '../../entities/item.entity';

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
    nullable: true,
    default: null,
  })
  refreshToken: string;

  @Column({
    default: false,
  })
  isActivated: boolean;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @OneToMany((type) => PantryEntity, (pantry) => pantry.user, { eager: true })
  @JoinTable()
  pantries: PantryEntity[];

  @OneToMany((type) => ItemEntity, (item) => item.user)
  items: ItemEntity[];
}
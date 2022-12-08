import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PantryEntity } from './pantry.entity';
import { ItemEntity } from './item.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class UserEntity extends BaseEntity {
  @ApiProperty({
    name: 'id',
    example: 'dbf19a29-a780-4e95-b54b-4b7ea9169b42',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    name: 'login',
    example: 'Tomasz@test.pl',
  })
  @Column()
  login: string;
  @ApiProperty({
    name: 'email',
    example: 'Tomasz@test.pl',
  })
  @Column()
  email: string;
  @ApiProperty({
    name: 'password',
    example: 'kd43902rm3u04fum3c3x04umxc9fu[490cumwx;cqwm',
  })
  @Column()
  password: string;

  @ApiProperty({
    name: 'refreshToken',
    example: 'Tomasz@test.pl',
  })
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

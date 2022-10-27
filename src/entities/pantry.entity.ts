import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ItemEntity } from './item.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@Entity()
export class PantryEntity extends BaseEntity {
  @ApiProperty({
    name: 'id',
    example: 'dbf19a29-a780-4e95-b54b-4b7ea9169b42',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    name: 'name',
    example: 'Lodówka na pietrze.',
  })
  @Column()
  name: string;

  @ApiModelProperty({
    name: 'user',
    type: () => UserEntity,
  })
  @ManyToOne((type) => UserEntity, (user) => user.pantries)
  user: UserEntity;
  @ApiModelProperty({
    name: 'items',
    type: () => ItemEntity,
  })
  @OneToMany((type) => ItemEntity, (item) => item.pantry, { eager: true })
  @JoinTable()
  items: ItemEntity[];
}

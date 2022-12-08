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
import { ApiProperty } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@Entity()
export class ItemEntity extends BaseEntity {
  @ApiProperty({
    name: 'id',
    example: 'dbf19a29-a780-4e95-b54b-4b7ea9169b42',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    name: 'name',
    example: 'Lodówka na piętrze',
  })
  @Column()
  name: string;

  @ApiProperty({
    name: 'createdAt',
    example: '2022-09-22T10:35:18.393Z',
  })
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @ApiProperty({
    name: 'expiration',
    example: '2022-09-22T10:35:18.393Z',
  })
  @Column()
  expiration: Date;

  @ApiModelProperty({
    name: 'pantry',
    type: () => PantryEntity,
  })
  @ManyToOne((type) => PantryEntity, (pantry) => pantry.items)
  pantry: PantryEntity;

  @ManyToOne((type) => UserEntity, (user) => user.items)
  @ApiModelProperty({
    name: 'user',
    type: () => UserEntity,
  })
  user: UserEntity;
}

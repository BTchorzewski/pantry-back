import {
  FetchShortPantriesResponse,
  ShortPantry,
  Stats,
} from '../../interfaces';
import { PantryEntity } from '../../entities/pantry.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ItemEntity } from '../../entities/item.entity';

export class StatsPantry implements Stats {
  @ApiProperty({ example: 10 })
  total: number;
  @ApiProperty({ example: 5 })
  fresh: number;
  @ApiProperty({ example: 4 })
  expiredSoon: number;
  @ApiProperty({ example: 1 })
  expired: number;
}

export class BasicPantry {
  @ApiProperty({ example: 'dbf19a29-a780-4e95-b54b-4b7ea9169b42' })
  id: string;
  @ApiProperty({ example: 'Building 2, room 203' })
  name: string;
  @ApiModelProperty({ type: StatsPantry })
  stats: StatsPantry;
}

export class FetchPantriesResponse {
  @ApiProperty({ type: [BasicPantry] })
  data: BasicPantry[];
  @ApiProperty({ example: 'Succeed' })
  message: string;
}

export class CreatedPantryResponse {
  @ApiProperty({ example: 'dbf19a29-a780-4e95-b54b-4b7ea9169b42' })
  pantryId: string;
  @ApiProperty({ example: 'The pantry has been created.' })
  message: string;
}

export class ItemModel {
  @ApiProperty({ example: 'dbf19a29-a780-4e95-b54b-4b7ea9169b42' })
  id: string;
  @ApiProperty({ example: 'Chocolate' })
  name: string;
  @ApiProperty({ example: '2022-09-22T12:18:51.072Z' })
  createdAt: Date;
  @ApiProperty({ example: '2023-05-22T12:18:51.072Z' })
  expiration: Date;
}

export class CompletePantryModel {
  @ApiProperty({ example: 'dbf19a29-a780-4e95-b54b-4b7ea9169b42' })
  id: string;
  @ApiProperty({ example: 'Building 2, room 203' })
  name: string;
  @ApiModelProperty({ type: [ItemModel] })
  items: ItemModel[];
}

export class FetchCompletePantryByIResponse {
  @ApiProperty({
    name: 'message',
    example: 'Succeed',
  })
  message: string;
  @ApiProperty({ type: CompletePantryModel })
  data: CompletePantryModel;
}

import { FetchAllPantryResponse } from '../../interfaces';
import { PantryEntity } from '../../entities/pantry.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';

import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ItemEntity } from '../../entities/item.entity';
export class ItemModel {
  @ApiProperty({
    name: 'id',
    example: '13aac193-640e-4f4d-b4d3-6b83d11e5e15',
  })
  id: string;
  @ApiProperty({
    name: 'name',
    example: '13aac193-640e-4f4d-b4d3-6b83d11e5e15',
  })
  name: string;
}

export class PantryModel {
  @ApiProperty({
    name: 'id',
    example: '13aac193-640e-4f4d-b4d3-6b83d11e5e15',
  })
  id: string;
  @ApiProperty({
    name: 'name',
    example: 'haha',
  })
  name: string;
  @ApiModelProperty({
    name: 'id',
    type: ItemModel,
  })
  items: ItemModel[];
}

export class GetPantriesResponse {
  @ApiProperty({
    name: 'message',
    example: 'Succeed',
  })
  message: string;
  @ApiProperty({
    name: 'data',
    type: PantryModel,
  })
  data: PantryModel[];
}

export class CreatedPantryResponse {
  @ApiProperty({ example: 'dbf19a29-a780-4e95-b54b-4b7ea9169b42' })
  pantryId: string;
  @ApiProperty({ example: 'The pantry has been created.' })
  message: string;
}

export class OKGetPantriesResponse {
  @ApiProperty({ example: 'Succeed' })
  messages: string;
  @ApiProperty({ type: () => PantryEntity })
  data: PantryEntity[];
}

export class ValidUpdatePantryRespond {
  @ApiProperty()
  message: string;
  @ApiModelProperty({
    name: 'data',
    type: PantryModel,
  })
  data: PantryModel;
}

export class InvalidUpdatePantryRespond {
  @ApiProperty({
    example: 400,
  })
  statusCode: number;
  @ApiProperty({
    example: 'The pantry was not found.',
  })
  message: string;
}
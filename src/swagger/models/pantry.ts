import { DeletePantryResponse, FetchAllPantryResponse } from '../../interfaces';
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
  @ApiProperty({
    name: 'createdAt',
    example: '2022-09-11T12:18:51.072Z',
    type: Date,
  })
  createdAt: Date;
  @ApiProperty({
    name: 'expiration',
    example: '2022-10-09T12:18:51.072Z',
    type: Date,
  })
  expiration: '2990-10-01T00:00:00.000Z';
}

export class PantryModel {
  @ApiProperty({
    name: 'id',
    example: '13aac193-640e-4f4d-b4d3-6b83d11e5e15',
  })
  id: string;
  @ApiProperty({
    name: 'name',
    example: 'the fridge at the attic.',
  })
  name: string;
  @ApiModelProperty({
    name: 'items',
    type: [ItemModel],
  })
  items: ItemModel[];
}

export class ApiOkPantryResponse {
  @ApiProperty({
    name: 'message',
    example: 'Succeed',
  })
  message: string;
  @ApiProperty({
    name: 'data',
    type: [PantryModel],
  })
  data: PantryModel[];
}

export class ApiCreatePantryResponse {
  @ApiProperty({ example: 'dbf19a29-a780-4e95-b54b-4b7ea9169b42' })
  pantryId: string;
  @ApiProperty({ example: 'The pantry has been created.' })
  message: string;
}

export class ApiOkUpdatePantryRespond {
  @ApiProperty()
  message: string;
  @ApiModelProperty({
    name: 'data',
    type: PantryModel,
  })
  data: PantryModel;
}

export class ApiBadRequestUpdatePantryRespond {
  @ApiProperty({
    example: 400,
  })
  statusCode: number;
  @ApiProperty({
    example: 'The pantry was not found.',
  })
  message: string;
}

export class ApiOkDeletePantryResponse implements DeletePantryResponse {
  @ApiProperty({
    name: 'message',
    example: 'The pantry has been deleted.',
  })
  message: string;
}

export class ApiBadRequestDeletePantryRespond
  implements ApiBadRequestUpdatePantryRespond
{
  @ApiProperty({
    name: 'statusCode',
    example: 400,
  })
  statusCode: number;
  @ApiProperty({
    name: 'message',
    example: 'The pantry was not found.',
  })
  message: string;
}

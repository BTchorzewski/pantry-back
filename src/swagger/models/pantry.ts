import {
  FetchShortPantriesResponse,
  ShortPantry,
  Stats,
} from '../../interfaces';
import { PantryEntity } from '../../entities/pantry.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

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

export class GetPantriesResponse {
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

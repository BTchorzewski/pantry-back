import { FetchAllPantryResponse } from '../../interfaces';
import { PantryEntity } from '../../entities/pantry.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GetPatriesResponse implements FetchAllPantryResponse {
  @ApiProperty()
  data: PantryEntity[];
  @ApiProperty()
  message: string;
}

export class CreatedPantryResponse {
  @ApiProperty({ example: 'dbf19a29-a780-4e95-b54b-4b7ea9169b42' })
  pantryId: string;
  @ApiProperty({ example: 'The pantry has been created.' })
  message: string;
}

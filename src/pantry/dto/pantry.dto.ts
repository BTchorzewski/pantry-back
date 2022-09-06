import { IsString, IsUUID, max, min } from 'class-validator';

export class CreatePantryDto {
  @IsUUID()
  userid: string;

  @IsString()
  name: string;
}

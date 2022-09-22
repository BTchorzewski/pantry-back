import { IsString, IsUUID } from 'class-validator';

export class CreatePantryDto {
  @IsString()
  name: string;
}

export class UpdatePantryDto {
  @IsString()
  name: string;
}

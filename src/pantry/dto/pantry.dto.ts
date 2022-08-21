import { IsString, length } from 'class-validator';

export class CreatePantryDto {
  @IsString()
  userId: string;
  @IsString()
  name: string;
}

export class UpdatePantryDto {
  @IsString()
  userId: string;
  @IsString()
  name: string;
}

export class FetchAllPantriesDto {
  @IsString()
  userId: string;
}

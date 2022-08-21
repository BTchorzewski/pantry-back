import { IsString } from 'class-validator';

export class CreatePantryDto {
  @IsString()
  userId: string;
  @IsString()
  name: string;
}

export class FetchAllPatriesDto {
  @IsString()
  userId: string;
}

import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePantryDto {
  @ApiProperty()
  @IsString()
  name: string;
}

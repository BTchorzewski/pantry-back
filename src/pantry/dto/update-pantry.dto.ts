import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePantryDto {
  @ApiProperty()
  @IsString()
  name: string;
}

import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePantryDto {
  @ApiProperty({
    example: 'Spiżarnia 2',
  })
  @IsString()
  name: string;
}

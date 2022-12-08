import { IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  expiration: Date;
}

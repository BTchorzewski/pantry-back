import { IsDate, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateItemDto {
  @IsString()
  name: string;
  @Type(() => Date)
  @IsDate()
  expiration: Date;
}

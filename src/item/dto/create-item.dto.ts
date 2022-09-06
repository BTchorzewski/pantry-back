import { IsDate, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateItemDto {
  @IsUUID()
  userId: string;
  @IsUUID()
  pantryId: string;
  @IsString()
  name: string;
  @Type(() => Date)
  @IsDate()
  expiration: Date;
}

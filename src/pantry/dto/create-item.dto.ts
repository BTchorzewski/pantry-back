import { IsDate, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiModelProperty({ type: 'string' })
  @IsString()
  name: string;
  @ApiModelProperty({})
  @Type(() => Date)
  @IsDate()
  expiration: Date;
}

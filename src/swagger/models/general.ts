import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UnauthorizedRespondSwagger {
  @ApiModelProperty({ example: 401 })
  statusCode: number;
  @ApiModelProperty({ example: 'Unauthorized' })
  message: string;
}
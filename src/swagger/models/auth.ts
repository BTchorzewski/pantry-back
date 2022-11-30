import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class ValidLoginResSwagger {
  @ApiModelProperty()
  accessToken: string;
  @ApiModelProperty()
  refreshToken: string;
}

export class InvalidEmailResSwagger {
  @ApiModelProperty({
    example: 400,
  })
  statusCode: number;
  @ApiModelProperty({
    example: 'The email was invalid',
  })
  message: string;
}

export class ValidLogoutRespondSwagger {
  @ApiModelProperty({ example: 'Your are logged out.' })
  message: string;
}

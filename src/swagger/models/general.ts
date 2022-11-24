import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { UserRegistrationRes } from '../../types';
import { ApiProperty } from '@nestjs/swagger';

export class ApiUnauthorizedRespondSwagger {
  @ApiProperty({ example: 401 })
  statusCode: number;
  @ApiProperty({ example: 'Unauthorized' })
  message: string;
}

export class SwaggerBadRequestResponse implements UserRegistrationRes {
  @ApiProperty({
    title: 'statusCode',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    title: 'message',
    example: 'Bad Request',
  })
  message: string;
}

export class ApiInternalServerError implements SwaggerBadRequestResponse {
  @ApiProperty({
    name: 'statusCode',
    example: 500,
  })
  statusCode: number;
  @ApiProperty({
    name: 'message',
    example: 'Server not working.',
  })
  message: string;
}

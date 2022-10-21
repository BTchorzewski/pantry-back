import { UserRegistrationRes } from '../../types';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class validRegistrationResponse implements UserRegistrationRes {
  @ApiModelProperty({
    title: 'messages',
    example: 'succeed',
  })
  message: string;
}

export class invalidRegistrationResponse implements UserRegistrationRes {
  @ApiModelProperty({
    title: 'statusCode',
    example: 400,
  })
  statusCode: number;

  @ApiModelProperty({
    title: 'message',
    example: 'Bad Request',
  })
  message: string;
}

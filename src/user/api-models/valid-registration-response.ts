import { UserRegistrationRes } from '../../types';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class validRegistrationResponse implements UserRegistrationRes {
  @ApiModelProperty({
    title: 'messages',
    example: 'succeed',
  })
  message: string;
  @ApiModelProperty({
    title: 'userId',
    example: '892cb9e3-372c-459b-80fb-d10b9976cbfe',
  })
  userId: string;
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

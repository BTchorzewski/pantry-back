import { UserRegistrationRes } from '../../types';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class user implements UserRegistrationRes {
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

export class UserActivationResponse {
  @ApiProperty({ examples: ['account activated.', 'invalid link'] })
  message: string;
}

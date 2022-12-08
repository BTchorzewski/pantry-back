import { UserRegistrationRes } from '../../types';
import { ApiProperty } from '@nestjs/swagger';

export class ApiUnauthorizedRespondSwagger {
  @ApiProperty({ example: 401 })
  statusCode: number;
  @ApiProperty({ example: 'Unauthorized' })
  message: string;
}

export class BadRequestResponseSwagger implements UserRegistrationRes {
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

export class ApiInternalServerErrorSwagger
  implements BadRequestResponseSwagger
{
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

export class ApiNotFoundResponseSwagger {
  @ApiProperty({ name: 'statusCode', example: 404 })
  statusCode: number;
  @ApiProperty({ name: 'message', example: 'The pantry not found' })
  message: string;
}

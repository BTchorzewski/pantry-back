import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class ValidLoginResSwagger {
  @ApiModelProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmMDgzNGNlLTgzYjEtNDFhMi1iMWUxLTY5ZjhkODBhMWM2MCIsImlhdCI6MTY2NjQ1NzU3NCwiZXhwIjoxNjY2NDU4NDc0fQ.411F-W4G4qXTW7HIum2D8xzMM5arHGkaycX_lrnng9U',
  })
  accessToken: string;
  @ApiModelProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBmMDgzNGNlLTgzYjEtNDFhMi1iMWUxLTY5ZjhkODBhMWM2MCIsImlhdCI6MTY2NjQ1NzU3NCwiZXhwIjoxNjY3NjY3MTc0fQ.rPssL7xbKNPhXU6UpNTzkDmnEjRc5R4mew5vZyq8XkI',
  })
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

export class UnauthorizedRespondSwagger {
  @ApiModelProperty({ example: 401 })
  statusCode: number;
  @ApiModelProperty({ example: 'Unauthorized' })
  message: string;
}

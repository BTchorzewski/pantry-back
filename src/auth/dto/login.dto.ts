import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({
    example: 'test@test.pl',
    description:
      'You dont have to change login if you import a database from the requirements file.',
  })
  @IsString()
  email: string;
  @ApiProperty({
    example: 1234,
    description:
      'You dont have to change login if you import a database from the requirements file.',
  })
  @IsString()
  password: string;
}

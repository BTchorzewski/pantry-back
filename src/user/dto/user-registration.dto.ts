import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UserRegistrationDto {
  @ApiProperty({
    example: 'tomasz.kot@test.pl',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    minLength: 5,
    maxLength: 15,
    example: 'qwert',
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 15)
  password: string;
}

import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserRegistrationDto {
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  @Length(5, 15)
  password: string;
}

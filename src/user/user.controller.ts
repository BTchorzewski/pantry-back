import { Body, Controller, forwardRef, Inject, Post } from '@nestjs/common';
import { UserRegistrationDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  @Post('/registration')
  userRegistration(@Body() { password, email }: UserRegistrationDto) {
    return this.userService.registerUser(email, password);
  }
}

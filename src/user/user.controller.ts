import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import { UserRegistrationDto } from './dto/user.dto';
import { UserService } from './user.service';
import { UserRegistrationRes } from '../types';

@Controller('user')
export class UserController {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  @Post('/registration')
  userRegistration(
    @Body() { password, email }: UserRegistrationDto,
  ): Promise<UserRegistrationRes> {
    return this.userService.registerUser(email, password);
  }

  @Get('/activation/:userId')
  accountActivation(@Param('userId', ParseUUIDPipe) id: string) {
    return this.userService.activateAccount(id);
  }
}

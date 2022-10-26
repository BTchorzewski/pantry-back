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
import { UserRegistrationDto } from './dto/user-registration.dto';
import { UserService } from './user.service';
import { UserRegistrationRes } from '../types';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  invalidRegistrationResponse,
  user,
} from '../swagger/models/user';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  @ApiBody({ type: UserRegistrationDto })
  @ApiResponse({
    status: 201,
    type: user,
  })
  @ApiBadRequestResponse({
    type: invalidRegistrationResponse,
  })
  @Post('/registration')
  userRegistration(
    @Body() { password, email }: UserRegistrationDto,
  ): Promise<UserRegistrationRes> {
    return this.userService.registerUser(email, password);
  }

  @ApiParam({ name: 'userId' })
  @Get('/activation/:userId')
  accountActivation(@Param('userId', ParseUUIDPipe) id: string) {
    return this.userService.activateAccount(id);
  }
}

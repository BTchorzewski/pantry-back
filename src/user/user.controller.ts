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
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { user, UserActivationResponse } from '../swagger/models/user';
import { BadRequestResponseSwagger } from '../swagger/models/general';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  @Post('/registration')
  // swagger section
  @ApiBody({ type: UserRegistrationDto })
  @ApiCreatedResponse({ type: user })
  @ApiBadRequestResponse({
    type: BadRequestResponseSwagger,
  })
  userRegistration(
    @Body() { password, email }: UserRegistrationDto,
  ): Promise<UserRegistrationRes> {
    return this.userService.registerUser(email, password);
  }

  @Get('/activation/:userId')
  // swagger section
  @ApiOkResponse({ type: UserActivationResponse })
  @ApiNotFoundResponse({ type: UserActivationResponse })
  @ApiParam({ name: 'userId' })
  accountActivation(@Param('userId', ParseUUIDPipe) id: string) {
    return this.userService.activateAccount(id);
  }
}

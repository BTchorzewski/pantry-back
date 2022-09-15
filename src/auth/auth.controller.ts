import {
  Body,
  Controller,
  forwardRef,
  Inject,
  Post,
  UseGuards,
  Request,
  Res,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { UserObj } from '../decorators/userObj.decorators';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login(@UserObj() user): Promise<any> {
    return this.authService.login(user);
  }

  @Post('/logout')
  logout(): Promise<any> {
    return this.authService.logout();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/test')
  testJwt(@Req() req): Promise<any> {
    return req.user;
  }
}

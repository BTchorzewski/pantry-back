import {
  Controller,
  forwardRef,
  Inject,
  Post,
  UseGuards,
  Get,
  Request,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { UserObj } from '../decorators/userObj.decorators';
import { UserId } from '../decorators/UserId';
import { AccessJwtGuard } from '../guards/access-jwt.guard';
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

  @Get('/logout')
  @UseGuards(AccessJwtGuard)
  logout(@UserId() id, @Req() req): Promise<any> {
    console.log({ logout: id });
    return this.authService.logout(id);
  }

  @Get('/test')
  @UseGuards(AccessJwtGuard)
  testJwt(@Req() req): any {
    return req.user.id;
  }
}

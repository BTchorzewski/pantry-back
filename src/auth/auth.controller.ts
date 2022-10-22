import {
  Controller,
  forwardRef,
  Inject,
  Post,
  UseGuards,
  Get,
  Request,
  Req,
  HttpCode,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { UserObj } from '../decorators/userObj.decorator';
import { UserId } from '../decorators/userId.decorator';
import { AccessJwtGuard } from '../guards/access-jwt.guard';
import { RefreshJwtGuard } from '../guards/refresh-jwt.guard';
import { RefreshToken } from '../decorators/RefreshToken.decorator';
import { TokensRes } from '../interfaces';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import {
  InvalidEmailResSwagger,
  UnauthorizedRespondSwagger,
  ValidLoginResSwagger,
} from './response-swagger/response';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}

  @ApiAcceptedResponse({ type: ValidLoginResSwagger })
  @ApiUnauthorizedResponse({ type: UnauthorizedRespondSwagger })
  @ApiBadRequestResponse({ type: InvalidEmailResSwagger })
  @Post('/login')
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @HttpCode(202)
  login(@UserObj() user): Promise<any> {
    return this.authService.login(user);
  }

  @Get('/logout')
  @UseGuards(AccessJwtGuard)
  logout(@UserId() id): Promise<any> {
    return this.authService.logout(id);
  }

  @Get('/refresh-token')
  @UseGuards(RefreshJwtGuard)
  refreshToken(@UserId() id, @RefreshToken() token): Promise<TokensRes> {
    return this.authService.refreshToken(id, token);
  }
}

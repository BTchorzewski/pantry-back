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
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import {
  InvalidEmailResSwagger,
  UnauthorizedRespondSwagger,
  ValidLoginResSwagger,
  ValidLogoutRespondSwagger,
} from './response-swagger/response';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}

  @ApiOkResponse({ type: ValidLoginResSwagger })
  @ApiUnauthorizedResponse({ type: UnauthorizedRespondSwagger })
  @ApiBadRequestResponse({ type: InvalidEmailResSwagger })
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@UserObj() user): Promise<any> {
    return this.authService.login(user);
  }

  @ApiBearerAuth('accessToken')
  @ApiUnauthorizedResponse({ type: UnauthorizedRespondSwagger })
  @ApiOkResponse({ type: ValidLogoutRespondSwagger })
  @Get('/logout')
  @UseGuards(AccessJwtGuard)
  logout(@UserId() id): Promise<any> {
    return this.authService.logout(id);
  }

  @ApiBearerAuth('refreshToken')
  @ApiOkResponse({ type: ValidLoginResSwagger })
  @ApiUnauthorizedResponse({ type: UnauthorizedRespondSwagger })
  @Get('/refresh-token')
  @UseGuards(RefreshJwtGuard)
  refreshToken(@UserId() id, @RefreshToken() token): Promise<TokensRes> {
    return this.authService.refreshToken(id, token);
  }
}

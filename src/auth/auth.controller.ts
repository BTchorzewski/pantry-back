import {
  Controller,
  forwardRef,
  Inject,
  Post,
  UseGuards,
  Get,
  Res,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { UserObj } from '../decorators/userObj.decorator';
import { UserId } from '../decorators/userId.decorator';
import { RefreshJwtGuard } from '../guards/refresh-jwt.guard';
import { RefreshTokenCookie } from '../decorators/RefreshToken.decorator';
import { TokensRes } from '../types';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import {
  InvalidEmailResSwagger,
  ValidLoginResSwagger,
  ValidLogoutRespondSwagger,
} from '../swagger/models/auth';
import {
  ApiInternalServerErrorSwagger,
  ApiUnauthorizedRespondSwagger,
} from '../swagger/models/general';
import { CookieOptions, Response } from 'express';

const cookieConfig = {
  httpOnly: true,
  maxAge: 90 * 1000 * 60,
  domain: 'localhost',
  sameSite: 'none',
  secure: true,
} as CookieOptions;

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}
  @Post('/login')
  @HttpCode(200)
  // authentication section
  @UseGuards(LocalAuthGuard)
  // swagger section
  @ApiOperation({
    description:
      'This route lets you login to the API. The route sends a json with an access token and it sets a refresh token up in a cookie.',
  })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: ValidLoginResSwagger })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiBadRequestResponse({ type: InvalidEmailResSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
  async login(
    @UserObj() user,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokensRes> {
    const { accessToken, refreshToken } = await this.authService.login(user);
    res.cookie('token', refreshToken, cookieConfig);
    return { accessToken };
  }

  @Get('/logout')
  // authentication section
  @UseGuards(RefreshJwtGuard)
  // swagger section
  @ApiCookieAuth('refreshToken')
  @ApiOperation({ description: 'Logout to api.' })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiOkResponse({ type: ValidLogoutRespondSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
  logout(
    @UserId() id,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    res.clearCookie('token');
    return this.authService.logout(id);
  }

  @Get('/refresh-token')
  // authentication section
  @UseGuards(RefreshJwtGuard)
  // swagger token
  @ApiCookieAuth('refreshToken')
  @ApiOperation({
    description: `This route uses JWT cookie auth, please login before using it. You don't need set a cookie manually, Swagger will set it up automatically.`,
  })
  @ApiOkResponse({ type: ValidLoginResSwagger })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
  async refreshToken(
    @UserId() id,
    @RefreshTokenCookie() token,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokensRes> {
    const { accessToken, refreshToken } = await this.authService.refreshToken(
      id,
      token,
    );
    res.cookie('token', refreshToken, cookieConfig);
    return { accessToken };
  }
}

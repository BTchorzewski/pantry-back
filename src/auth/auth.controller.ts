import {
  Controller,
  forwardRef,
  Inject,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { UserObj } from '../decorators/userObj.decorator';
import { UserId } from '../decorators/userId.decorator';
import { AccessJwtGuard } from '../guards/access-jwt.guard';
import { RefreshJwtGuard } from '../guards/refresh-jwt.guard';
import { RefreshToken } from '../decorators/RefreshToken.decorator';
import { TokensRes } from '../types';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
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

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
  ) {}

  @Post('/login')
  // authentication section
  @UseGuards(LocalAuthGuard)
  // swagger section
  @ApiOperation({ description: 'Login to api.' })
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: ValidLoginResSwagger })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiBadRequestResponse({ type: InvalidEmailResSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
  login(@UserObj() user): Promise<TokensRes> {
    return this.authService.login(user);
  }

  @Get('/logout')
  // authentication section
  @ApiBearerAuth('accessToken')
  @UseGuards(AccessJwtGuard)
  // swagger section
  @ApiOperation({ description: 'Logout to api.' })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiOkResponse({ type: ValidLogoutRespondSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
  logout(@UserId() id): Promise<any> {
    return this.authService.logout(id);
  }

  @Get('/refresh-token')
  // authentication section
  @ApiBearerAuth('refreshToken')
  @UseGuards(RefreshJwtGuard)
  // swagger token
  @ApiOperation({ description: 'Refresh JWT tokens' })
  @ApiOkResponse({ type: ValidLoginResSwagger })
  @ApiUnauthorizedResponse({ type: ApiUnauthorizedRespondSwagger })
  @ApiInternalServerErrorResponse({ type: ApiInternalServerErrorSwagger })
  refreshToken(@UserId() id, @RefreshToken() token): Promise<TokensRes> {
    return this.authService.refreshToken(id, token);
  }
}

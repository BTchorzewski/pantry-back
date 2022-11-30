import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entities/user.entity';
import { TokensRes } from '../interfaces';
import { config } from '../config/config';
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    @Inject(forwardRef(() => JwtService)) private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }
  async comparePasswords(
    password: string,
    passwordFromDB: string,
  ): Promise<boolean> {
    return compare(password, passwordFromDB);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    if (user === null)
      throw new HttpException('The email was invalid', HttpStatus.BAD_REQUEST);

    if (!(await this.comparePasswords(password, user.password))) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
    };
  }

  async refreshToken(userId: string, token: string): Promise<TokensRes> {
    const user = await UserEntity.findOneBy({ id: userId });
    if (!user) throw new BadRequestException('The user is not found.');
    const isValidToken =
      JSON.stringify(user.refreshToken) === JSON.stringify(token);

    if (!isValidToken) throw new ForbiddenException();
    const { accessToken, refreshToken } = this.generatesTokens(userId);
    return {
      refreshToken,
      accessToken,
    };
  }

  async clearRefreshToken(userId: string): Promise<void> {
    if (!userId) throw new ForbiddenException();

    const result = await UserEntity.createQueryBuilder('user')
      .update()
      .where('id = :id AND refreshToken IS NOT NULL', { id: userId })
      .set({ refreshToken: null })
      .execute();
  }

  generatesTokens(userId: string): TokensRes {
    const accessToken = this.jwtService.sign(
      { id: userId },
      {
        expiresIn: '15m',
        privateKey: config.jwt.accessToken,
      },
    );
    const refreshToken = this.jwtService.sign(
      { id: userId },
      {
        expiresIn: '14d',
        privateKey: config.jwt.refreshToken,
      },
    );

    return {
      refreshToken,
      accessToken,
    };
  }

  async updateRefreshToken(userId: string, refreshToken): Promise<void> {
    const user = await UserEntity.findOneBy({ id: userId });
    if (!user) throw new BadRequestException('The user is not found.');
    user.refreshToken = refreshToken;
    await user.save();
  }

  async login(user: { id: string; email: string }): Promise<TokensRes> {
    const { accessToken, refreshToken } = this.generatesTokens(user.id);
    await this.updateRefreshToken(user.id, refreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(id: string) {
    await this.clearRefreshToken(id);
    return {
      message: 'Your are logged out.',
    };
  }
}

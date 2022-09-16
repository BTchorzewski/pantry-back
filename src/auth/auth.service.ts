import {
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
import { v4 as uuid } from 'uuid';
import { UserEntity } from '../entities/user.entity';
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
      throw new HttpException('The email was invalid', HttpStatus.FORBIDDEN);

    if (!(await this.comparePasswords(password, user.password))) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
    };
  }

  async validateToken(userId, token): Promise<any> {
    const user = await UserEntity.findOneBy({
      accessToken: token,
      id: userId,
    });

    if (user === null) {
      throw new UnauthorizedException();
    }

    return {
      user,
    };
  }

  async login(user: { id: string; email: string }) {
    const newUser = await this.userService.findUserByEmail(user.email);
    if (newUser === null) throw new UnauthorizedException();
    const accessToken = uuid();
    newUser.accessToken = accessToken;
    await newUser.save();
    const jwt = this.jwtService.sign({
      id: newUser.id,
      token: newUser.accessToken,
    });
    return { jwt };
  }

  async logout(id: string) {
    const user = await UserEntity.findOneBy({ id });
    if (user === null) throw new UnauthorizedException();
    user.accessToken = null;
    await user.save();
    return {
      message: 'Your are logged out.',
    };
  }
}

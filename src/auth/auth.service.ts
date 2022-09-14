import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';

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

  async login(user: { id: string; email: string }) {
    const newUser = await this.userService.findUserByEmail(user.email);

    return { results: newUser };
  }

  logout() {
    return Promise.resolve(undefined);
  }
}

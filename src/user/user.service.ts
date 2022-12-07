import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from '../entities/user.entity';
import { EmailService } from '../email/email.service';
import { Raw } from 'typeorm';
import { UserRegistrationRes } from '../types';
import { LoggedUser, UserForLogin } from '../interfaces/user/user';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
    @Inject(forwardRef(() => EmailService)) private emailService: EmailService,
  ) {}

  async registerUser(
    email: string,
    password: string,
  ): Promise<UserRegistrationRes> {
    try {
      const fetchedEmails = await UserEntity.findOneBy({ email });
      if (fetchedEmails !== null)
        throw new HttpException('invalid email', HttpStatus.BAD_REQUEST);
      const newUser = new UserEntity();
      newUser.email = email;
      newUser.password = await this.authService.hashPassword(password);
      newUser.login = email.split('@')[0];
      await newUser.save();
      await this.emailService.registrationEmail(
        {
          email,
          id: newUser.id,
        },
        this.emailService.registrationTemplate,
      );

      return {
        message: 'succeed',
        userId: newUser.id,
      };
    } catch (e) {
      if (e instanceof HttpException) throw e;
    }
  }

  async activateAccount(id: string) {
    const user = await UserEntity.findOneBy({
      id,
      isActivated: false,
      createdAt: Raw((createdAt) => `DATEDIFF(NOW(), ${createdAt}) < 3`),
    });
    if (user === null)
      return {
        message: 'invalid link',
      };
    user.isActivated = true;
    await user.save();
    return {
      message: 'account activated.',
    };
  }
  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return UserEntity.findOne({
      where: { email },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
@Injectable()
export class AuthService {
  async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }
  async comparePasswords(
    password: string,
    passwordFromDB: string,
  ): Promise<boolean> {
    return compare(password, passwordFromDB);
  }
}

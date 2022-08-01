import { Controller, forwardRef, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => AuthService)) authService: AuthService,
  ) {}
}

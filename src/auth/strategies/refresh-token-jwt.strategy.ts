import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { config } from '../../config/config';
import { JwtPayload } from '../../types';
import { Request } from 'express';
@Injectable()
export class RefreshTokenJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.refreshToken,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, { id }: JwtPayload) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { id, refreshToken };
  }
}

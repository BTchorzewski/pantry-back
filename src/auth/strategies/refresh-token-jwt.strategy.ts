import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Strategy } from 'passport-cookie';
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
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          return req.cookies?.token;
        },
      ]),
      secretOrKey: config.jwt.refreshToken.key,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    return { id: payload.id };
  }
}

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
interface Req {
  user: {
    id: string;
    refreshToken;
  };
}

export const RefreshToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Req;
    return request.user.refreshToken;
  },
);

export const RefreshTokenCookie = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;
    return request.cookies?.token;
  },
);

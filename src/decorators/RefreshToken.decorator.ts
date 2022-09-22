import { createParamDecorator, ExecutionContext } from '@nestjs/common';

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

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type UserType = {
  userId: string;
  email: string;
};

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);

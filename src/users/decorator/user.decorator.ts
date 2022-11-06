import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Users } from '../entitiy/Users';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): Users => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);

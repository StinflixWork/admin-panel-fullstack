import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import prisma from '@prisma/client';

export const CurrentUser = createParamDecorator(
  (data: keyof prisma.User, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return data ? user[data] : user;
  },
);

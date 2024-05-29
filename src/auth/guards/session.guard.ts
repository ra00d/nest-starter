import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Request } from 'express';

@Injectable()
export class SessionGuard extends AuthGuard('session') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const result: boolean = (await super.canActivate(context)) as boolean;
    const req = context.switchToHttp().getRequest<Request>();

    if (
      req.session?.passport?.user === undefined ||
      req.session?.passport?.user === null
    ) {
      throw new UnauthorizedException();
    }
    req.user = req.session?.passport?.user;
    return result;
  }
}

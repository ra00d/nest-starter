import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  constructor(private readonly i18n: I18nService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result: boolean = (await super.canActivate(context)) as boolean;
    await super.logIn(context.switchToHttp().getRequest());
    return result;
  }
  //
  handleRequest(err, user, info, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    if (err || !user) {
      throw new UnauthorizedException({
        message: this.i18n.t('errors.credintials', {
          lang: request.acceptsLanguages()[0],
        }),
      });
    }
    request.user = user;
    return user;
  }
}

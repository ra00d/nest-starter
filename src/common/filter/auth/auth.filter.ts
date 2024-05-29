import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(UnauthorizedException)
export class AuthFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    console.log(exception);
    let response = exception.getResponse();
    if (typeof response === 'string') {
      response = {
        message: response,
      };
    }

    return res.status(403).json({
      ...response,
    });
  }
}

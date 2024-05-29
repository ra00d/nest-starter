import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from '../user.service';
import { User } from '../entities/user.entity';

@Injectable()
export class SessionStaregy extends PassportSerializer {
  serializeUser(user: User, done: (err: Error, user: any) => void) {
    if (!user) {
      return done(
        new UnauthorizedException({
          message: 'Wrong email or password',
        }),
        null,
      );
    }
    done(null, {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  }
  async deserializeUser(payload: any, done: Function) {
    done(null, payload);
  }
}

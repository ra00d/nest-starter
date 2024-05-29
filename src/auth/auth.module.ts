import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { LocalStrategy } from './startegies/local.startegy';
import { SessionStaregy } from './startegies/session.strategy';

// @Global()
@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, SessionStaregy],
})
export class AuthModule {}

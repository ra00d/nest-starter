import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('logout')
  logout(@Req() request: Request): Promise<any> {
    return this.authService.logout(request);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  login(@Req() request: Request) {
    return request.user;
  }

  @Get('verify/email')
  async verifyEmail(@Query('token') token: string) {
    console.log(token);
  }
  @Post('reg-admin')
  register(): Promise<any> {
    return this.authService.register();
  }
}

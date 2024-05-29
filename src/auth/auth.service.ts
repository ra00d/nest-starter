import { HttpStatus, Injectable } from '@nestjs/common';
import * as bycrypt from 'bcrypt';
import { Request } from 'express';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (!user) return null;
    const passwordMatch: boolean = await this.passworMatch(pass, user.password);

    if (!passwordMatch) return null;
    return user;
  }

  async passworMatch(password: string, hash: string): Promise<boolean> {
    return await bycrypt.compare(password, hash);
  }

  async login() {
    return {
      message: 'Login successful',
      statusCode: HttpStatus.OK,
    };
  }

  async logout(request: Request): Promise<any> {
    request.logout({ keepSessionInfo: false }, (err) => {});
    // request.session.destroy(() => {
    //   return {
    //     message: 'Logout successful',
    //     statusCode: HttpStatus.OK,
    //   };
    // });
    return {
      message: 'Logout successful',
      statusCode: HttpStatus.OK,
    };
  }

  async register(): Promise<any> {
    const user = await this.userService.createAdmin();
    return user;
  }
}

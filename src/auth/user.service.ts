import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly entityManger: EntityManager) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.entityManger.findOne(User, {
      where: { email: username },
    });
  }
  async createAdmin() {
    const user = new User();
    user.email = 'admin@email.com';
    user.name = 'admin';
    user.password = 'password';
    user.role = 'ADMIN';
    user.active = true;
    user.lastLogin = new Date();

    return await this.entityManger.save(User, user);
  }
}

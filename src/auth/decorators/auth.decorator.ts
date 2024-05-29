import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { SessionGuard } from '../guards/session.guard';

// TODO: add roles and permissions for this decorator

type Role = 'ADMIN' | 'USER';
export function Auth(...roles: Role[]) {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(SessionGuard));
}

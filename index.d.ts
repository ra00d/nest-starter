import type { User } from 'src/auth/entities/user.entity';

// export {};
export declare module 'express-session' {
  interface SessionData {
    views: number;
    test: string;
    passport: {
      user?: User;
    };
  }
}

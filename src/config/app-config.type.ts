import { MailConfig } from 'mail/config/mailer.config';

export type ServerConfig = {
  nodeEnv: string;
  name: string;
  url: string;
  port: number;
  debug: boolean;
  apiPrefix: string;
  fallbackLanguage: string;
  logLevel: string;
  logService: string;
  // corsOrigin: boolean | string | RegExp | (string | RegExp)[];
};

// import { AuthConfig } from '@/api/auth/config/auth-config.type';
// import { DatabaseConfig } from '@/database/config/database-config.type';
// import { MailConfig } from 'mail/config/mail-config.type';

export type AppConfig = {
  app: ServerConfig;
  mail: MailConfig;
};

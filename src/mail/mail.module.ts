import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MailService } from './mail.service';
import { AppConfig } from 'config/app-config.type';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService<AppConfig>) => {
        const transport: MailerOptions['transport'] = {
          host: 'smtp.gmail.com', // config.get('mail.host', { infer: true }),
          port: config.get('mail.port', { infer: true }),
          ignoreTLS: config.get('mail.ignoreTLS', { infer: true }),
          requireTLS: config.get('mail.requireTLS', { infer: true }),
          secure: config.get('mail.secure', { infer: true }),
          logger: true, // false: disable logger, to enable set true or MailerCustomLogger.getInstance() (custom logger using NestJS Logger)
          auth: {
            user: 'raa94833ad@gmail.com', // config.get('mail.user', { infer: true }),
            pass: config.get('mail.password', { infer: true }),
          },
        };

        return {
          transport,
          defaults: {
            from: `"${config.get('mail.defaultName', { infer: true })}" <${config.get('mail.defaultEmail', { infer: true })}>`,
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

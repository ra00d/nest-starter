import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'config/app-config.type';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService<AppConfig>,
    private readonly mailerService: MailerService,
  ) {}

  async sendEmailVerification(email: string, token: string) {
    console.log(email, token);

    // Please replace the URL with your own frontend URL
    const url = `${this.configService.get('app.url', { infer: true })}/api/auth/verify/email?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Email Verification',
      template: 'email-verification',
      context: {
        email: email,
        url,
      },
    });
  }
}

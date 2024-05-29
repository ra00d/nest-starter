import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailmanModule } from '@squareboat/nest-mailman';
import { TestmailService } from './services/testMail.service';

@Global()
@Module({
  imports: [
    MailmanModule.registerAsync({
      imports: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get('mailman');
      },
      inject: [ConfigService],
    }),
  ],
  providers: [TestmailService],
  exports: [TestmailService],
})
export class MailerModule {}

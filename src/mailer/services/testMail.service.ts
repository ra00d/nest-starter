import { Injectable } from '@nestjs/common';
import { MailMessage, Mailman } from '@squareboat/nest-mailman';

@Injectable()
export class TestmailService {
  private toMail() {
    const mail = MailMessage.init()
      .greeting('Hello Raad 👋')
      .line('Thank you for choosing this package to deliver your mails. ')
      .line('We cannot wait you see build with this package. 🫶')
      .table([
        { website: 'Squareboat', href: 'https://squareboat.com' },
        { website: 'Github', href: 'https://github.com/squareboat' },
      ])
      .action('View Docs', 'https://squareboat.com/')
      .subject('Hey there from Squareboat');
    return mail;
  }
  async send() {
    return await Mailman.init().to('ra0.0adn@gmail.com').send(this.toMail());
  }
}

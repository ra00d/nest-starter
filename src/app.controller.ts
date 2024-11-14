import { Controller, Get, Post, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { Setting } from 'api/settings/entities/setting.entity';
import { I18n, I18nContext } from 'nestjs-i18n';
import { EntityManager } from 'typeorm';
import { Public } from './auth/decorators/public.decorator';
import { navItems } from './constants/frontend/nav-items.constants';
import { MailService } from 'mail/mail.service';

@Controller()
export class AppController {
  constructor(
    private readonly db: EntityManager,
    private mailer: MailService,
  ) {}

  @Get()
  @Public()
  @Render('index')
  async getHello(@I18n() i18n: I18nContext) {
    const settings = await this.db.findOne(Setting, { where: { id: 1 } });
    const data = settings?.settings;
    const lang = i18n.lang;
    return {
      title: 'Home',
      name: 'Site name',
      lang: i18n.lang === 'ar' ? 'en' : 'ar',
      message: 'Hello world daisy',
      navItems: navItems,
      ...data,
      about:
        lang === 'ar'
          ? settings?.settings.aboutUsAr || '    -'
          : settings?.settings.aboutUsEn || '   -',
      // layout: 'layouts/main',
    };
  }
  @Get('/en')
  enLang(@Res() res: Response) {
    res.cookie('lang', 'en');
    res.redirect('/');
  }

  @Get('/ar')
  arLang(@Res() res: Response) {
    res.cookie('lang', 'ar');
    res.redirect('/');
  }
  @Get('/login')
  @Render('login')
  async loginPage() {
    return {
      layout: '',
    };
  }
  // NOTE: test email
  @Post('mail')
  async sendMail() {
    await this.mailer.sendEmailVerification(
      'ra0.0adn@gmail.com',
      'd8a397d6-3bb0-4a51-9610-51c50497414e',
    );
    return {
      msg: 'mail sent',
    };
  }
}

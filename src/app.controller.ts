import { Controller, Get, Render, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { Setting } from 'main/settings/entities/setting.entity';
import { I18n, I18nContext } from 'nestjs-i18n';
import { EntityManager } from 'typeorm';
import { Public } from './auth/decorators/public.decorator';
import { SessionGuard } from './auth/guards/session.guard';
import { navItems } from './constants/frontend/nav-items.constants';
import { TestmailService } from 'mailer/services/testMail.service';

@Controller()
export class AppController {
  constructor(
    private readonly db: EntityManager,
    private mailer: TestmailService,
  ) {}

  @Get()
  @Public()
  @Render('index')
  async getHello(@I18n() i18n: I18nContext) {
    const settings = await this.db.findOne(Setting, { where: { id: 1 } });
    const data = settings.settings;
    const lang = i18n.lang;
    return {
      title: 'Home',
      name: 'Tahfeedh',
      lang: i18n.lang === 'ar' ? 'en' : 'ar',
      message: 'Hello world daisy',
      navItems: navItems,
      ...data,
      about:
        lang === 'ar'
          ? settings.settings.aboutUsAr
          : settings.settings.aboutUsEn,
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

  @Get('test')
  @UseGuards(SessionGuard)
  async getAbout(@I18n() i18n: I18nContext, @Req() req: Request) {
    return {
      title: 'About',
      name: 'Tahfeedh',
      lang: i18n.lang === 'ar' ? 'en' : 'ar',
      navItems: navItems,
      user: req.user,
    };
  }
  @Get('mail')
  async sendMail() {
    await this.mailer.send();
    return {
      msg: 'mail sent',
    };
  }
}

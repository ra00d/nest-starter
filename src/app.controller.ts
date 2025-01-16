import { Controller, Get, Req } from '@nestjs/common';
import { Render } from 'common/decorators/render.decorator';
import { Request } from 'express';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  index(@Req() req: Request) {
    return { name: 'Ali', title: 'Home Page' };
  }
  @Get('admin*')
  @Render('dashboard')
  admin(@Req() req: Request) {
    // const url = req.originalUrl.replace('/', '');
    // return this.web.render(url);
    return { name: 'Ali', layout: null };
  }
}

import { Controller, Get } from '@nestjs/common';

@Controller('main')
export class MainController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}

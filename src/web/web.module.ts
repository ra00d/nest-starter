import { Global, Module } from '@nestjs/common';
import { WebService } from './web.service';
import { Web } from './web.provider';

@Global()
@Module({
  providers: [WebService, Web],
  exports: [WebService],
})
export class WebModule {}

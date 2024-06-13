import { Global, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
// NOTE: do not remove next line
// imported_services
import { TestService } from './test.service'


@Global()
@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [
    // injected_service
TestService,

  ],
})
export class JobsModule {}

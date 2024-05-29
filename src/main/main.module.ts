import { Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [SettingsModule],
  controllers: [MainController],
})
export class MainModule {}

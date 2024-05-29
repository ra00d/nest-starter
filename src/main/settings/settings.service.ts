import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { CreateSettingDto } from './dto/create-setting.dto';
import { Setting } from './entities/setting.entity';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Injectable()
export class SettingsService {
  constructor(private readonly db: EntityManager) {}
  async create(createSettingDto: CreateSettingDto) {
    const settings = new Setting();
    settings.settings = {
      ...createSettingDto,
    };
    return await this.db.save(Setting, settings);
  }

  async findAll() {
    return (await this.db.find(Setting, { select: ['settings'] }))[0].settings;
  }

  findOne(id: number) {
    return `This action returns a #${id} setting`;
  }

  async update(createSettingDto: UpdateSettingDto) {
    const settings = await this.db.findOne(Setting, {
      where: {
        id: 1,
      },
    });
    settings.settings = {
      ...settings.settings,
      ...createSettingDto,
    };
    const data = await this.db.save(Setting, settings);
    return data.settings;
  }

  remove(id: number) {
    return `This action removes a #${id} setting`;
  }
}

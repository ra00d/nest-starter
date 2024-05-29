import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateSettingDto } from '../dto/create-setting.dto';

@Entity()
export class Setting {
  @PrimaryGeneratedColumn('increment')
  id: number;

  // @Column({ unique: true })
  // key: string;
  //
  // @Column('text')
  // value: string;
  @Column('simple-json')
  settings: CreateSettingDto;
}

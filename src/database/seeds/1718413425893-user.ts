import { User } from '../../auth/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class User1718413425893 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.log('in seed');

    const userFactory = factoryManager.get(User);
    await userFactory.saveMany(2);
  }
}

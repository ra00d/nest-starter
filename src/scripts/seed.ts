import { User } from '../auth/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

(async () => {
  const options: DataSourceOptions = {
    type: 'mysql',
    database: 'nest_db',
    username: 'root',
    entities: [User],
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  await runSeeders(dataSource, {
    seeds: ['src/database/seeds/**/*{.ts,.js}'],
    factories: ['src/database/factories/**/*{.ts,.js}'],
  });
})();

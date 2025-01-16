import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from './naming.strategy';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const options: TypeOrmModuleOptions = {
          type: 'mysql',
          host: configService.getOrThrow('DATABASE_HOST'),
          username: configService.getOrThrow('DATABASE_USER'),
          password: configService.getOrThrow('DATABASE_PASSWORD'),
          database: configService.getOrThrow('DATABASE_NAME'),
          port: configService.getOrThrow('DATABASE_PORT'),
          synchronize: configService.getOrThrow('DATABASE_SYNCHRONIZE'), // configService.getOrThrow('NODE_ENV') === 'development',
          // logger: 'debug',
          // logging: ['query', 'error'],
          // logging: true,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
          namingStrategy: new SnakeNamingStrategy(),
        };

        return options;
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

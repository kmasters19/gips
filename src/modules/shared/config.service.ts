/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment */
import { Logger } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { SnakeNamingStrategy } from '../../snake-naming.strategy';

export class ConfigService {
  private _logger = new Logger(ConfigService.name);

  constructor() {
    const nodeEnv = this.nodeEnv;
    dotenv.config({
      path: `.${nodeEnv}.env`
    });
    // Replace \\n with \n to support multiline strings in AWS
    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
    }

    this._logger.log(process.env);
  }

  public get(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  get nodeEnv(): string {
    return this.get('NODE_ENV') || 'development';
  }
  get typeOrmConfig(): TypeOrmModuleOptions {
    let entities = [__dirname + '/../**/*.entity{.ts,.js}'];
    this._logger.log('Entities:');
    this._logger.log(entities);
    let migrations = [__dirname + '/../migrations/*{.ts,.js}'];

    if ((<any>module).hot) {
      const entityContext = (<any>require).context(
        './../../modules',
        true,
        /\.entity\.ts$/
      );
      entities = entityContext.keys().map(id => {
        const entityModule = entityContext(id);
        const [entity] = Object.values(entityModule);
        return entity;
      });
      const migrationContext = (<any>require).context(
        './../migrations',
        false,
        /\.ts$/
      );
      migrations = migrationContext.keys().map(id => {
        const migrationModule = migrationContext(id);
        const [migration] = Object.values(migrationModule);
        return migration;
      });
    }
    if (this.nodeEnv !== 'production') {
      return {
        entities,
        migrations,
        keepConnectionAlive: true,
        type: 'postgres',
        url: this.get('DATABASE_URL'),
        synchronize: true,
        migrationsRun: true,
        logging: false,
        namingStrategy: new SnakeNamingStrategy()
      };
    }

    return {
      entities,
      migrations,
      keepConnectionAlive: true,
      type: 'postgres',
      url: this.get('DATABASE_URL'),
      extra: {
        ssl: { rejectUnauthorized: false }
      },
      synchronize: true,
      migrationsRun: true,
      logging: false,
      namingStrategy: new SnakeNamingStrategy()
    };
  }
}

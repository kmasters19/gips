import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SearchModule } from './modules/search/search.module';
import { SharedModule } from './modules/shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './modules/shared/config.service';
import { LoaderModule } from './modules/loader/loader.module';
import { AuthModule } from './modules/auth/auth.module';
import { CsvModule } from 'nest-csv-parser';
import { UsersModule } from './modules/users/users.module';
import { contextMiddleware } from './middleware/context.middleware';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService]
    }),
    CsvModule,
    SearchModule,
    SharedModule,
    LoaderModule,
    AuthModule,
    UsersModule
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(contextMiddleware).forRoutes('*');
  }
}

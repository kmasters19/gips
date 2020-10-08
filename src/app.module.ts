import { Module } from '@nestjs/common';
import { SearchModule } from './modules/search/search.module';
import { SharedModule } from './modules/shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './modules/shared/config.service';
import { LoaderModule } from './modules/loader/loader.module';
import { AuthModule } from './modules/auth/auth.module';
import { CsvModule } from 'nest-csv-parser';

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
    AuthModule
  ]
})
export class AppModule {}

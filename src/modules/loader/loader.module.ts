import { Module } from '@nestjs/common';
import { LoaderService } from './loader.service';
import { LoaderController } from './loader.controller';
import { CsvModule } from 'nest-csv-parser';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [CsvModule, SearchModule],
  providers: [LoaderService],
  controllers: [LoaderController]
})
export class LoaderModule {}

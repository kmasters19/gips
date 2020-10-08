/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, Logger } from '@nestjs/common';
import { IFile } from '../../interfaces/IFile';
import { Readable } from 'stream';
import { CsvParser, ParsedData } from 'nest-csv-parser';
import { LoadAccountDto } from './dtos/load-account.dto';
import { SearchService } from '../search/search.service';
import { LoadImprovementDetailsDto } from './dtos/load-improvement-detail.dto';
import { LoadImprovementsDto } from './dtos/load-improvements.dto';
import { LoadLandSizesDto } from './dtos/load-land-sizes.dto';
import { LoadLegalsDto } from './dtos/load-legals.dto';
import { LoadOwnerAddressesDto } from './dtos/load-owner-addresses.dto';
import { LoadValueDetailsDto } from './dtos/load-value-details.dto';

@Injectable()
export class LoaderService {
  private logger = new Logger(LoaderService.name);

  constructor(
    private csvParser: CsvParser,
    private searchService: SearchService
  ) {}
  async loadAccounts(clientId: string, file: IFile) {
    try {
      const readable = new Readable();
      readable._read = () => {};
      readable.push(file.buffer);
      readable.push(null);

      const data: ParsedData<LoadAccountDto> = await this.csvParser.parse(
        readable,
        LoadAccountDto,
        null,
        1,
        { separator: '\t' }
      );

      await this.searchService.deleteClientAccounts(clientId);

      for (const item of data.list) {
        await this.searchService.createAccount(clientId, item);
      }

      return true;
    } catch (err) {
      this.logger.log('error');
      this.logger.log(err);
      throw err;
    }
  }

  async loadImprovementDetails(clientId: string, file: IFile) {
    try {
      const readable = new Readable();
      readable._read = () => {};
      readable.push(file.buffer);
      readable.push(null);
      const data: ParsedData<LoadImprovementDetailsDto> = await this.csvParser.parse(
        readable,
        LoadImprovementDetailsDto,
        null,
        1,
        { separator: '\t' }
      );

      await this.searchService.deleteClientImprovementDetails(clientId);
      for (const item of data.list) {
        await this.searchService.createImprovementDetail(clientId, item);
      }

      return true;
    } catch (err) {
      this.logger.log('error');
      this.logger.log(err);
      return false;
    }
  }

  async loadImprovements(clientId: string, file: IFile) {
    try {
      const readable = new Readable();
      readable._read = () => {};
      readable.push(file.buffer);
      readable.push(null);
      const data: ParsedData<LoadImprovementsDto> = await this.csvParser.parse(
        readable,
        LoadImprovementsDto,
        null,
        1,
        { separator: '\t' }
      );

      await this.searchService.deleteClientImprovements(clientId);
      for (const item of data.list) {
        await this.searchService.createImprovement(clientId, item);
      }

      return true;
    } catch (err) {
      this.logger.log('error');
      this.logger.log(err);
      return false;
    }
  }

  async loadLandSizes(clientId: string, file: IFile) {
    try {
      const readable = new Readable();
      readable._read = () => {};
      readable.push(file.buffer);
      readable.push(null);
      const data: ParsedData<LoadLandSizesDto> = await this.csvParser.parse(
        readable,
        LoadLandSizesDto,
        null,
        1,
        { separator: '\t' }
      );

      await this.searchService.deleteClientLandSizes(clientId);
      for (const item of data.list) {
        await this.searchService.createLandSize(clientId, item);
      }

      return true;
    } catch (err) {
      this.logger.log('error');
      this.logger.log(err);
      return false;
    }
  }

  async loadLegals(clientId: string, file: IFile) {
    try {
      const readable = new Readable();
      readable._read = () => {};
      readable.push(file.buffer);
      readable.push(null);
      const data: ParsedData<LoadLegalsDto> = await this.csvParser.parse(
        readable,
        LoadLegalsDto,
        null,
        1,
        { separator: '\t' }
      );

      await this.searchService.deleteClientLegals(clientId);
      for (const item of data.list) {
        await this.searchService.createLegal(clientId, item);
      }

      return true;
    } catch (err) {
      this.logger.log('error');
      this.logger.log(err);
      return false;
    }
  }

  async loadOwnerAddresses(clientId: string, file: IFile) {
    try {
      const readable = new Readable();
      readable._read = () => {};
      readable.push(file.buffer);
      readable.push(null);
      const data: ParsedData<LoadOwnerAddressesDto> = await this.csvParser.parse(
        readable,
        LoadOwnerAddressesDto,
        null,
        1,
        { separator: '\t' }
      );

      await this.searchService.deleteClientOwnerAddresses(clientId);
      for (const item of data.list) {
        await this.searchService.createOwnerAddress(clientId, item);
      }

      return true;
    } catch (err) {
      this.logger.log('error');
      this.logger.log(err);
      return false;
    }
  }

  async loadValueDetails(clientId: string, file: IFile) {
    try {
      const readable = new Readable();
      readable._read = () => {};
      readable.push(file.buffer);
      readable.push(null);
      const data: ParsedData<LoadValueDetailsDto> = await this.csvParser.parse(
        readable,
        LoadValueDetailsDto,
        null,
        1,
        { separator: '\t' }
      );

      await this.searchService.deleteClientValueDetails(clientId);
      for (const item of data.list) {
        await this.searchService.createValueDetail(clientId, item);
      }

      return true;
    } catch (err) {
      this.logger.log('error');
      this.logger.log(err);
      return false;
    }
  }
}

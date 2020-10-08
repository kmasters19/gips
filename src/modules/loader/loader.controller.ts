import {
  Controller,
  Logger,
  Param,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoaderService } from './loader.service';
import { IFile } from '../../interfaces/IFile';

@Controller('loader')
export class LoaderController {
  private logger = new Logger(LoaderController.name);

  constructor(private loaderService: LoaderService) {}

  @Post(':clientId/accounts')
  @UseInterceptors(FileInterceptor('file'))
  async loadAccounts(
    @Param() params,
    @UploadedFile() file: IFile
  ): Promise<boolean> {
    return this.loaderService.loadAccounts(params.clientId, file);
  }

  @Post(':clientId/improvementDetails')
  @UseInterceptors(FileInterceptor('file'))
  async loadImprovementDetails(
    @Param() params,
    @UploadedFile() file: IFile
  ): Promise<boolean> {
    return this.loaderService.loadImprovementDetails(params.clientId, file);
  }

  @Post(':clientId/improvements')
  @UseInterceptors(FileInterceptor('file'))
  async loadImprovements(
    @Param() params,
    @UploadedFile() file: IFile
  ): Promise<boolean> {
    return this.loaderService.loadImprovements(params.clientId, file);
  }

  @Post(':clientId/landSizes')
  @UseInterceptors(FileInterceptor('file'))
  async loadLandSizes(
    @Param() params,
    @UploadedFile() file: IFile
  ): Promise<boolean> {
    return this.loaderService.loadLandSizes(params.clientId, file);
  }

  @Post(':clientId/legals')
  @UseInterceptors(FileInterceptor('file'))
  async loadLegals(
    @Param() params,
    @UploadedFile() file: IFile
  ): Promise<boolean> {
    return this.loaderService.loadLegals(params.clientId, file);
  }

  @Post(':clientId/owners')
  @UseInterceptors(FileInterceptor('file'))
  async loadOwnerAddresses(
    @Param() params,
    @UploadedFile() file: IFile
  ): Promise<boolean> {
    return this.loaderService.loadOwnerAddresses(params.clientId, file);
  }

  @Post(':clientId/valueDetails')
  @UseInterceptors(FileInterceptor('file'))
  async loadValueDetails(
    @Param() params,
    @UploadedFile() file: IFile
  ): Promise<boolean> {
    return this.loaderService.loadValueDetails(params.clientId, file);
  }
}

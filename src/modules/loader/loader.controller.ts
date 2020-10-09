import {
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoaderService } from './loader.service';
import { IFile } from '../../interfaces/IFile';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { UserEntity } from '../entities/user.entity';
import { AuthUserInterceptor } from '../../interceptors/auth-user.interceptor';

@Controller('loader')
@UseGuards(JwtAuthGuard)
export class LoaderController {
  private logger = new Logger(LoaderController.name);

  constructor(private loaderService: LoaderService) {}

  @Post('accounts')
  @UseInterceptors(FileInterceptor('file'), AuthUserInterceptor)
  async loadAccounts(
    @AuthUser() user: UserEntity,
    @UploadedFile() file: IFile
  ): Promise<boolean> {
    return this.loaderService.loadAccounts(user.username, file);
  }

  @Post('improvementDetails')
  @UseInterceptors(FileInterceptor('file'), AuthUserInterceptor)
  async loadImprovementDetails(
    @AuthUser() user: UserEntity,
    @UploadedFile() file: IFile
  ): Promise<boolean> {
    return this.loaderService.loadImprovementDetails(user.username, file);
  }

  @Post('improvements')
  @UseInterceptors(FileInterceptor('file'), AuthUserInterceptor)
  async loadImprovements(
    @AuthUser() user: UserEntity,
    @UploadedFile() file: IFile
  ): Promise<boolean> {
    return this.loaderService.loadImprovements(user.username, file);
  }

  @Post('landSizes')
  @UseInterceptors(FileInterceptor('file'), AuthUserInterceptor)
  async loadLandSizes(
    @AuthUser() user: UserEntity,
    @UploadedFile() file: IFile
  ): Promise<boolean> {
    return this.loaderService.loadLandSizes(user.username, file);
  }

  @Post('legals')
  @UseInterceptors(FileInterceptor('file'), AuthUserInterceptor)
  async loadLegals(
    @AuthUser() user: UserEntity,
    @UploadedFile() file: IFile
  ): Promise<boolean> {
    return this.loaderService.loadLegals(user.username, file);
  }

  @Post('owners')
  @UseInterceptors(FileInterceptor('file'), AuthUserInterceptor)
  async loadOwnerAddresses(
    @AuthUser() user: UserEntity,
    @UploadedFile() file: IFile
  ): Promise<boolean> {
    return this.loaderService.loadOwnerAddresses(user.username, file);
  }

  @Post('valueDetails')
  @UseInterceptors(FileInterceptor('file'), AuthUserInterceptor)
  async loadValueDetails(
    @AuthUser() user: UserEntity,
    @UploadedFile() file: IFile
  ): Promise<boolean> {
    return this.loaderService.loadValueDetails(user.username, file);
  }
}

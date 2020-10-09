import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post
} from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchRequestDto } from './dtos/search-request.dto';
import { SearchResultDto } from './dtos/search-result.dto';
import { SearchResultDetailDto } from './dtos/search-result-detail.dto';
import { UsersService } from '../users/users.service';

@Controller('search')
export class SearchController {
  private logger = new Logger(SearchController.name);

  constructor(
    private searchService: SearchService,
    private userService: UsersService
  ) {}

  @Get('counties')
  async getCounties() {
    return this.userService.list();
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async search(@Body() payload: SearchRequestDto): Promise<SearchResultDto[]> {
    this.logger.log(payload);
    return this.searchService.search(payload);
  }

  @Get(':clientId/:accountId')
  @HttpCode(HttpStatus.OK)
  async details(@Param() params): Promise<SearchResultDetailDto> {
    return this.searchService.detail(
      params.accountId,
      params.clientId.toLowerCase()
    );
  }
}

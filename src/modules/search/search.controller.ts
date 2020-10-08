import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchRequestDto } from './dtos/search-request.dto';
import { SearchResultDto } from './dtos/search-result.dto';
import { SearchResultDetailDto } from './dtos/search-result-detail.dto';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async search(@Body() payload: SearchRequestDto): Promise<SearchResultDto[]> {
    return this.searchService.search(payload);
  }

  @Get(':clientId/:accountId')
  @HttpCode(HttpStatus.OK)
  async details(@Param() params): Promise<SearchResultDetailDto> {
    return this.searchService.detail(params.accountId, params.clientId);
  }
}

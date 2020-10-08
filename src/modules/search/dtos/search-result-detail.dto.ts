import { SearchResultDto } from './search-result.dto';
import { AccountDetailDto } from './account-detail.dto';
import { AbstractItemDto } from './abstract-item.dto';
import { ImprovementSummaryDto } from './improvement-summary.dto';

export class SearchResultDetailDto extends SearchResultDto {
  parcelNumber: string;
  mailingAddress: string;
  city: string;
  state: string;
  zip: string;
  accounts: AccountDetailDto[];
  legalDescription: string;
  locationAddress: string;
  locationCity: string;
  abstractItems: AbstractItemDto[];
  improvements: ImprovementSummaryDto[];
}

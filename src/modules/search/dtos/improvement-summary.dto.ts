import { ImprovementSummaryDetailDto } from './improvement-summary-detail.dto';

export class ImprovementSummaryDto {
  accountNumber: string;
  appraisalType: string;
  accountStatus: string;
  parcelNumber: string;
  propertyType: string;
  bathCount: number;
  bedroomCount: number;
  improvementNumber: number;
  hvac: string;
  exterior: string;
  interior: string;
  units: number;
  detailType: string;
  buildingId: number;
  yearBuilt: number;
  description: string;
  sqFt: number;
  details: ImprovementSummaryDetailDto[];
}

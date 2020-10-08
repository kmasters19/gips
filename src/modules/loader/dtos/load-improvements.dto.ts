import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class LoadImprovementsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ACCOUNTNO: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ACCTSTATUSCODE: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  APPRAISALTYPE: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  PARCELNO: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  IMPNO: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  PROPERTYTYPE: string;

  @ApiPropertyOptional({ default: 0 })
  @IsNumber()
  @IsOptional()
  BATHCOUNT: number;

  @ApiPropertyOptional({ default: 0 })
  @IsNumber()
  @IsOptional()
  BEDROOMCOUNT: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  BLTASDESCRIPTION: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  BLTASSF: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  BLTASYEARBUILT: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  HVACTYPE: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  IMPEXTERIOR: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  IMPINTERIOR: string;

  @ApiPropertyOptional({ default: 0 })
  @IsNumber()
  @IsOptional()
  DETAILUNITCOUNT: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  IMPDETAILTYPE: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  APPRAISALTYPE1: string;
}

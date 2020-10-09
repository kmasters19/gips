import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SearchRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  accountNumber: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ownerName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  propertyAddress: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  pin: string;
}

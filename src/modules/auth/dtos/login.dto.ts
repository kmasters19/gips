import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

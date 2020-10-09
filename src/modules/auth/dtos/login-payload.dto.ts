import { UserEntity } from '../../entities/user.entity';
import { TokenPayloadDto } from './token-payload.dto';
import { ApiProperty } from '@nestjs/swagger';

export class LoginPayloadDto {
  @ApiProperty({ type: UserEntity })
  user: UserEntity;
  @ApiProperty({ type: TokenPayloadDto })
  token: TokenPayloadDto;

  constructor(user: UserEntity, token: TokenPayloadDto) {
    this.user = user;
    this.token = token;
  }
}

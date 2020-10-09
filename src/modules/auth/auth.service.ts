import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { UserEntity } from '../entities/user.entity';
import { TokenPayloadDto } from './dtos/token-payload.dto';
import { ConfigService } from '../shared/config.service';
import { ContextService } from '../../prividers/context.service';

@Injectable()
export class AuthService {
  private static _authUserKey = 'user_key';

  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(payload: LoginDto): Promise<UserEntity> {
    const user = await this.userService.findByUsername(payload.clientId);
    const isValid = bcrypt.compare(payload.password, user && user.password);
    if (!user || !isValid) {
      throw new NotFoundException();
    }
    return user;
  }

  async createToken(user: UserEntity): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: 24,
      accessToken: await this.jwtService.signAsync({ id: user.id })
    });
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  static setAuthUser(user: UserEntity) {
    ContextService.set(AuthService._authUserKey, user);
  }
}

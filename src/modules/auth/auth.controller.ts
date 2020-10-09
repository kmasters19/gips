import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { LoginPayloadDto } from './dtos/login-payload.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserEntity } from '../entities/user.entity';
import { AuthUserInterceptor } from '../../interceptors/auth-user.interceptor';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

  @Post('createClientUser')
  async createUser(@Body() payload: LoginDto) {
    return this.userService.createUser(payload);
  }

  @Post('login')
  async login(@Body() payload: LoginDto) {
    const user = await this.authService.validateUser(payload);
    const token = await this.authService.createToken(user);
    return new LoginPayloadDto(user, token);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AuthUserInterceptor)
  getCurrentUser(@AuthUser() user: UserEntity) {
    return user;
  }
}

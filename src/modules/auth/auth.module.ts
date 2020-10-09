import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from '../shared/shared.module';
import { ConfigService } from '../shared/config.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [SharedModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_KEY'),
          signOptions: { expiresIn: '24h' }
        };
      },
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}

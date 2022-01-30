import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/Users/Users.module';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { LocalStrategy, JwtStrategy } from './strategies';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: 'JWT_SECRET',
      signOptions: {
        expiresIn: '10m',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}

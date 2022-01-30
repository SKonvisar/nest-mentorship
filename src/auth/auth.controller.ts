import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
  ValidationPipe,
  UseInterceptors,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategies/local.strategy';
import { SignUpDto } from './signup.dto';
import { Request } from 'express';
import { MapTokensInterceptors } from './map-tokens-interceptor';

@Controller('auth')
@UseInterceptors(MapTokensInterceptors)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Req() req) {
    return await this.authService.login(req.user);
  }

  @Post('signup')
  async signUp(@Body(new ValidationPipe()) userData: SignUpDto) {
    return this.authService.createUser(userData);
  }

  @Get('refresh')
  async getNewTokens(@Req() req: Request) {
    const refreshToken = req.signedCookies['refresh-token'];
    if (refreshToken) {
      return this.authService.refreshTokens(refreshToken);
    } else {
      throw new UnauthorizedException();
    }
  }

  /**
   * Temporary solution is used to clear httpOnly cookie on client
   * @returns a hardcoded boolean
   */
  @Get('logout')
  async logout() {
    return true;
  }
}

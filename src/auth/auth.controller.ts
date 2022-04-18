import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategies/local.strategy';
import { Request } from 'express';
import { MapTokensInterceptors } from './map-tokens-interceptor';
import { SignUpDto, ValidationPipe } from './validation';

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
  async signUp(@Body(ValidationPipe) userData: SignUpDto) {
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
    return { success: true };
  }
}

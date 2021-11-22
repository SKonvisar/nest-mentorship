import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.strategy';
import { SignUpDto } from './signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signUp(@Body(new ValidationPipe()) userData: SignUpDto) {
    return this.authService.createUser(userData);
  }
}

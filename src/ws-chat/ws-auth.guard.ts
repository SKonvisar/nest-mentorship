import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(ctx: ExecutionContext) {
    const client = ctx.switchToWs().getClient();
    const { token } = client.handshake.auth;
    if (token) {
      const user = await this.authService.verifyJwt(token);

      if (user) {
        ctx.switchToWs().getClient().handshake.user = user;
        return !!user;
      }
    }
    return false;
  }
}

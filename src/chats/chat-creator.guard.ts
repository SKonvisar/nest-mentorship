import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ChatsService } from './chats.service';

@Injectable()
export class CharCreatorGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private chatService: ChatsService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const user = await this.ejectUserFromRequest(req);
    const chatId = req.params.id;

    if (chatId && user) {
      const chat = await this.chatService.getChatById(chatId, user.id);
      return chat.creatorId === user.id;
    }

    throw new ForbiddenException();
  }

  async ejectUserFromRequest(req: any) {
    if (req.user) {
      return req.user;
    }

    try {
      const authHeader = req.headers.authorization;
      const jwtToken = authHeader && authHeader.split(' ')[1];
      const user = await this.authService.verifyJwt(jwtToken);

      return user || null;
    } catch (e) {
      return null;
    }
  }
}

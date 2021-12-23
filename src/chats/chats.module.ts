import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma';
import { ChatsController } from './chats.controller';

import { ChatsService } from './chats.service';

@Module({
  imports: [PrismaModule],
  controllers: [ChatsController],
  providers: [ChatsService],
  exports: [ChatsService],
})
export class ChatsModule {}

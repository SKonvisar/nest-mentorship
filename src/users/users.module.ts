import { Module } from '@nestjs/common';

import { UsersService } from './Users.service';
import { UsersController } from './Users.controller';

import { PrismaService } from '../prisma/prisma.service';
import { ChatsModule } from '../chats/chats.module';

@Module({
  imports: [ChatsModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}

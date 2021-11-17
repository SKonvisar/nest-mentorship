import { Module } from '@nestjs/common';

import { UsersService } from './Users.service';
import { UsersController } from './Users.controller';

import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}

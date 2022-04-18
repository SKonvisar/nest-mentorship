import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt.strategy';
import { CharCreatorGuard } from './chat-creator.guard';
import { ChatsService } from './chats.service';
import { CreateChatDto, UpdateChatDto } from './dto/create-chat.dto';

@Controller('chats')
@UseGuards(JwtAuthGuard)
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @Get()
  getUserChats(@Req() req) {
    return this.chatsService.getUsersChats(req.user.userId);
  }

  @Get(':id')
  getChatById(@Req() req, @Param('id') id: string) {
    return this.chatsService.getChatById(id, req.user.userId);
  }

  @Post('create')
  creatChat(@Req() req, @Body(new ValidationPipe()) body: CreateChatDto) {
    const creatorId = req.user.userId;

    return this.chatsService.createChat(creatorId, body);
  }

  @Patch(':id')
  @UseGuards(CharCreatorGuard)
  updateChat(@Param('id') id, @Body(new ValidationPipe()) body: UpdateChatDto) {
    this.chatsService.updateChat(id, body);
  }

  @Delete(':id')
  @UseGuards(CharCreatorGuard)
  deleteChat(@Param('id') id: string) {
    if (id) {
      return this.chatsService.deleteChat(id);
    }
  }

  @Get('mock-create-message')
  createMessage() {
    this.chatsService.createMessage(
      '7cdbcadd-7f1f-4ec6-9a75-40c5db1fe057',
      '5140042d-caab-41fe-aa70-e3e579b5f5e8',
      'Hello world!',
    );
    this.chatsService.createMessage(
      'cadb08e3-93ae-4d97-a19d-1c8d2a33e915',
      '5140042d-caab-41fe-aa70-e3e579b5f5e8',
      'Hello universe!',
    );
  }
}

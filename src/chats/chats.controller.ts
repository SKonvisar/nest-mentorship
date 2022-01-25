import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.strategy';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chats')
export class ChatsController {
  constructor(private chatsService: ChatsService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  creatChat(@Req() req, @Body(new ValidationPipe()) body: CreateChatDto) {
    const creatorId = req.user.userId;

    // this.chatsService.deleteChat('85f69130-0a43-4694-bb2b-786d4937c001');
    return this.chatsService.createChat(creatorId, body);
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

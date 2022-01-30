import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt.strategy';
import { CreateUserDto } from './dto';
import { UsersService } from './Users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @Post()
  createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateUser(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateUserDto: CreateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }
}

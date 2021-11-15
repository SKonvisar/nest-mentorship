import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService, User } from '../prisma';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<any> {
    return await this.prisma.user.findMany();
  }

  async getById(id: number): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
        rejectOnNotFound: true,
      });
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({ data: { ...createUserDto } });
  }

  async remove(id: number): Promise<User> {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async update(id: number, updateUserDto: CreateUserDto) {
    return this.prisma.user.update({
      data: { ...updateUserDto },
      where: { id },
    });
  }
}

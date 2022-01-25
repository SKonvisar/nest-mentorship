import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService, User } from '../prisma';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<any> {
    return await this.prisma.user.findMany();
  }

  async getById(id: string): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
        rejectOnNotFound: true,
      });
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async getByEmail(email: string): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
        rejectOnNotFound: false,
      });
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({ data: { ...createUserDto } });
  }

  async remove(id: string): Promise<User> {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      data: { ...updateUserDto },
      where: { id },
    });
  }

  async createMockUsers() {
    await this.prisma.user.createMany({
      data: [
        { firstName: 'Andrii', lastName: 'Doe', email: 'adoe@mail.com' },
        { firstName: 'Rich', lastName: 'Gomez', email: 'rgom@mail.com' },
        { firstName: 'Anup', lastName: 'Prapapa', email: 'anup@mail.com' },
        { firstName: 'Michel', lastName: 'LastName', email: 'mlast@mail.com' },
      ],
    });
  }
}

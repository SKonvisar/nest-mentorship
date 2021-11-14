import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { IUser } from './types';

const mockUsers = [
  { id: 1, name: 'Serhii' },
  { id: 2, name: 'John' },
  { id: 3, name: 'Doe' },
  { id: 4, name: 'Mark' },
];

const delayedPromise = (fn: (res, rej) => void, delay = 100): Promise<any> =>
  new Promise((res, rej) => setTimeout(() => fn(res, rej), delay));

@Injectable()
export class UsersService {
  private users = [...mockUsers];

  async getAll(): Promise<any> {
    return delayedPromise((res) => res(this.users));
  }

  async getById(id: number): Promise<IUser> {
    try {
      return await delayedPromise((res, rej) => {
        const user = this.users.find(({ id: uid }) => uid === id);
        user ? res(user) : rej();
      });
    } catch (e) {
      throw new HttpException('User has no found', HttpStatus.NOT_FOUND);
    }
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = { id: this.users.length + 1, ...createUserDto };
    this.users.push(newUser);

    return newUser;
  }

  async remove(id: number): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }

  async update(id: number, updateUserDto: CreateUserDto) {
    this.users = this.users.map((user) => {
      console.log(typeof user.id, typeof id);
      if (user.id === id) {
        console.log(user.id, id);
        return { ...user, ...updateUserDto };
      }
      return user;
    });
  }
}

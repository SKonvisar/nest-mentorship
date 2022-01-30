import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/Users/Users.service';
import { SignUpDto } from './signup.dto';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface SignedResponse extends TokenPair {
  user: User;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<User | null> {
    const user = await this.userService.getByEmail(login);
    if (user && password === 'Test123') {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<SignedResponse> {
    return {
      ...this.getTokensPair(user),
      user,
    };
  }

  async createUser(userData: SignUpDto): Promise<SignedResponse> {
    const { password, ...rest } = userData;
    const newUser = await this.userService.getById(
      '7cdbcadd-7f1f-4ec6-9a75-40c5db1fe057',
    );
    // const newUser = await this.userService.create(rest);

    return {
      ...this.getTokensPair(newUser),
      user: newUser,
    };
  }

  async verifyJwt(token: string): Promise<User> {
    const { email } = this.jwtService.verify(token);
    const user = await this.userService.getByEmail(email);
    return user;
  }

  async refreshTokens(refreshToken: string): Promise<SignedResponse> {
    const user = await this.verifyJwt(refreshToken);
    return { ...this.getTokensPair(user), user };
  }

  private getTokensPair(user: any): TokenPair {
    return {
      accessToken: this.jwtService.sign({
        sub: user.id,
        email: user.email,
      }),
      refreshToken: this.jwtService.sign(
        {
          sub: user.id,
          email: user.email,
        },
        { expiresIn: '7d' },
      ),
    };
  }
}

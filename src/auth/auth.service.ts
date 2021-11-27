import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/Users/Users.service';
import { SignUpDto } from './signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string) {
    const user = await this.userService.getByEmail(login);
    if (user && password === 'Test123') {
      return user;
    }
    return null;
  }

  async login(user) {
    return {
      accessToken: this.jwtService.sign({ sub: user.id, email: user.email }),
      user,
    };
  }

  async createUser(userData: SignUpDto) {
    const { password, ...rest } = userData;
    const newUser = await this.userService.getById(3);

    return {
      accessToket: this.jwtService.sign({
        sub: newUser.id,
        email: newUser.email,
      }),
      user: newUser,
    };
  }

  async verifyJwt(token: string) {
    const { email } = this.jwtService.verify(token);
    const user = await this.userService.getByEmail(email);
    return user;
  }
}

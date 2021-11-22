import { MaxLength, MinLength } from 'class-validator';
import { CreateUserDto } from '../users/dto';

export class SignUpDto extends CreateUserDto {
  @MinLength(8)
  @MaxLength(20)
  password: string;
}

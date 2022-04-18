import { MaxLength, MinLength } from 'class-validator';
import { CreateUserDto } from '../../users/dto';

export class SignUpDto extends CreateUserDto {
  @MinLength(8, { message: 'Password should have at least 8 characters' })
  @MaxLength(20, { message: 'Password should have less than  20 characters' })
  password: string;
}

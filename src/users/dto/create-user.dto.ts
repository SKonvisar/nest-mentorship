import { IsEmail, IsString } from 'class-validator';
import { User } from '@prisma/client';

type DBUserFields = Omit<User, 'id'>;

export class CreateUserDto implements DBUserFields {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class UpdateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

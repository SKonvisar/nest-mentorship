import { IsEmail, IsString } from 'class-validator';
import { User } from '@prisma/client';

// TODO: add creations of admins
type OmitKeys = 'id' | 'role';

type DBUserFields = Omit<User, OmitKeys>;

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

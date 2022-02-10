import { IsString } from 'class-validator';

export class UpdateChatDto {
  @IsString()
  name: string;
}

export class CreateChatDto {
  @IsString({ each: true })
  membersIds: string[];

  @IsString()
  name: string;
}

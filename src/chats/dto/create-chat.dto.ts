import { IsString } from 'class-validator';

export class CreateChatDto {
  @IsString({ each: true })
  membersIds: string[];

  @IsString()
  name: string;
}

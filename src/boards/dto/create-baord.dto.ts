import { MaxLength, MinLength } from 'class-validator';
import { Users } from 'src/users/entitiy/Users';

export class CreateBoardDto {
  @MaxLength(20)
  title: string;

  @MaxLength(200)
  content: string;

  @MaxLength(20)
  @MinLength(6)
  password: string;

  user: Users;
}

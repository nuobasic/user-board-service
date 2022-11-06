import { MaxLength, MinLength } from 'class-validator';

export class CreateBoardDto {
  @MaxLength(20)
  title: string;

  @MaxLength(200)
  content: string;

  @MaxLength(20)
  @MinLength(6)
  password: string;
}

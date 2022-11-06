import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { LogInUserDto } from './dto/user-login.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * 유저 회원가입 서비스입니다.
   * @url POST 'api/users/signup'
   * @Body body 회원가입에 필요한 정보 { 이메일, 비밀번호,  }
   * @returns 유저 회원가입
   */
  @Post('signup')
  async signUp(@Body() createUsertDto: CreateUserDto) {
    return await this.usersService.signUp(createUsertDto);
  }

  /**
   * 유저 회원가입 서비스입니다.
   * @url POST 'api/users/login'
   * @Body 로그인의 필요한 정보 { 이메일, 비밀번호,  }
   * @returns 유저 로그인
   */
  @Post('login')
  async logIn(@Body() loginUserDto: LogInUserDto) {
    return await this.usersService.logIn(loginUserDto);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { LogInUserDto } from './dto/user-login.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  async signUp(@Body() createUsertDto: CreateUserDto) {
    return await this.usersService.signUp(createUsertDto);
  }

  @Post('login')
  async logIn(@Body() loginUserDto: LogInUserDto) {
    return await this.usersService.logIn(loginUserDto);
  }
}

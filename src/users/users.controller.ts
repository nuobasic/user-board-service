import { Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signUp')
  async signUp(createUsertDto: CreateUserDto) {
    return await this.usersService.signUp(createUsertDto);
  }
}

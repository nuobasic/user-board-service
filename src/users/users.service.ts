import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entitiy/Users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/user-create.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async signUp(createUsertDto: CreateUserDto) {
    const { email, password } = createUsertDto;

    const findUser = await this.userRepository.findOne({ where: { email } });

    if (findUser) {
      throw new UnauthorizedException('이미 존재하는 email입니다');
    }
    const hashePassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      email,
      password: hashePassword,
    });
    const result = await this.userRepository.save(user);

    return result;
  }
}

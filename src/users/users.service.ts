import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entitiy/Users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/user-create.dto';
import { LogInUserDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private jwtService: JwtService,
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

  async logIn(loginUserDto: LogInUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login 실패');
    }
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Repository } from 'typeorm';
import { Users } from '../entitiy/Users';
import { JwtPayload } from './jwtPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Users)
    private usersRepositoyr: Repository<Users>,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET_KEY, // token 이 유효한지 체크, token 생성할때 사용한 것과 같아야함
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload) {
    const { email } = payload;

    const user: Users = await this.usersRepositoyr.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

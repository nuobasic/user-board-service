import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-baord.dto';
import { Boards } from './entity/Boards';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Boards)
    private boardsRepository: Repository<Boards>,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto) {
    const { title, content, password } = createBoardDto;
    // 비밀번호 체크 정규식
    const passwordRules = /(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}/.test(password);

    if (!passwordRules) {
      throw new BadRequestException({
        statusCode: 400,
        message: '비밀번호는 최소 1개의 숫자를 포함해야합니다.',
      });
    }
    const hashePassword = await bcrypt.hash(password, 10);
    const board = await this.boardsRepository.create({
      title,
      content,
      password: hashePassword,
    });
    const result = await this.boardsRepository.save(board);
    return result;
  }

  // 게시판 최신순 조회
  async ageAllBoard(): Promise<Boards[]> {
    return await this.boardsRepository.find({
      order: { createAt: 'DESC' },
    });
  }
}

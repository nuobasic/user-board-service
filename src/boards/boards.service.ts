import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-baord.dto';
import { Boards } from './entity/Boards';
import * as bcrypt from 'bcrypt';
import { RequestBoardDto } from './dto/request-board.dto';
import { UpdateBoardDto } from './dto/update.board';
import { Users } from 'src/users/entitiy/Users';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Boards)
    private boardsRepository: Repository<Boards>,
  ) {}

  async createBoard(createBoardDto: CreateBoardDto, users: Users) {
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
      users,
    });
    const result = await this.boardsRepository.save(board);
    return result;
  }

  // 게시판 최신순 조회
  async ageAllBoard(offset: number): Promise<Boards[]> {
    return await this.boardsRepository.find({
      take: 20,
      skip: offset,
      order: { createAt: 'DESC' },
    });
  }

  async deleteBoard(boardId: number, { password }: RequestBoardDto) {
    const board = await this.boardsRepository.findOne({
      where: { boardId },
    });
    //생성 비밀번호와 입력 비밀번호가 같아야 삭제가 가능합니다.
    if (board && (await bcrypt.compare(password, board.password))) {
      return this.boardsRepository.softDelete(boardId);
    }
  }

  async updateBoard(
    boardId: number,
    { password }: RequestBoardDto,
    { title, content }: UpdateBoardDto,
  ) {
    const baord = await this.boardsRepository.findOne({
      where: { boardId },
    });
    //비밀번호가 다르면 아래와 같은 메세지를 내보냅니다.
    if (baord && !(await bcrypt.compare(password, baord.password))) {
      throw new NotFoundException({
        statusCode: 404,
        message: '비밀번호가 다르거나 게시물이 없습니다..',
      });
    }
    return await this.boardsRepository.update(boardId, {
      title,
      content,
    });
  }
}

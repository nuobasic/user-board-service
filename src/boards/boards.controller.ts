import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { GetUser } from 'src/users/decorator/user.decorator';
import { Users } from 'src/users/entitiy/Users';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-baord.dto';
import { RequestBoardDto } from './dto/request-board.dto';
import { UpdateBoardDto } from './dto/update.board';
import { Boards } from './entity/Boards';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  /**
   * @url POST 'api/boards'
   * @Body 게시글 body {title, content, passeord}
   * @description 게시판 생성 기능
   * @returns 게시판 생성
   */
  @HttpCode(201)
  @Post()
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() users: Users,
  ) {
    return await this.boardsService.createBoard(createBoardDto, users);
  }

  /**
   * @url Get 'api/boards'
   * @description 게시판 조회
   * @returns 전체 게시판 조호;
   */
  @HttpCode(200)
  @Get()
  async getAllBoard(): Promise<Boards[]> {
    return await this.boardsService.ageAllBoard();
  }

  /**
   * @url Delete 'api/boards/:boardId'
   * @Body requestBoardDto {passeord}
   * @description 게시판 삭제 기능
   * @returns 게시판 삭제
   */
  @HttpCode(200)
  @Delete(':boardId')
  async getBoard(
    @Param('boardId') boardId: number,
    @Body() requestBoardDto: RequestBoardDto,
  ) {
    await this.boardsService.deleteBoard(boardId, requestBoardDto);
    return {
      statusCode: 200,
      message: '삭제 성공',
    };
  }
  /**
   * @url Put 'api/boards/:boardId'
   * @Body requestBoardDto {passeord}
   * @Body updateBoardDto {content, title}
   * @description 게시판 수정기능
   * @returns 게시판 수정
   */
  @HttpCode(200)
  @Put(':boardId')
  async updateBoard(
    @Param('boardId') boardId: number,
    @Body() requestBoardDto: RequestBoardDto,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    await this.boardsService.updateBoard(
      boardId,
      requestBoardDto,
      updateBoardDto,
    );
    return {
      statusCode: 200,
      message: '변경 성공',
    };
  }
}

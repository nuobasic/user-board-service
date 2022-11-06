import { Controller, Post, Body, HttpCode, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-baord.dto';
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
  async createBoard(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardsService.createBoard(createBoardDto);
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
}

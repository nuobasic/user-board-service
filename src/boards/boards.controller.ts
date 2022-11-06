import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-baord.dto';

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
}

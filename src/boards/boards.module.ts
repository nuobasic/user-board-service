import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boards } from './entity/Boards';

@Module({
  imports: [TypeOrmModule.forFeature([Boards])],
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}

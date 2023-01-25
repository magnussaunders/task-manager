import {Body, Controller, Delete, Get, Param, Patch, Put} from '@nestjs/common';
import {BoardService} from "./board.service";
import {Board} from "./board.entity";

@Controller('board')
export class BoardController {
    constructor(
        private boardService: BoardService
    ) {}

    @Get()
    getAllBoards(): Promise<Board[]> {
        return this.boardService.findAll()
    }

    @Get(':boardId')
    getBoardById(@Param() params): Promise<Board> {
        return this.boardService.findById(params.boardId)
    }

    @Put()
    createBoard(@Body() board: Board): Promise<Board> {
        return this.boardService.create(board)
    }

    @Patch()
    updateBoard(@Body() board: Board): Promise<Board> {
        return this.boardService.update(board)
    }

    @Delete()
    deleteBoard(@Body() board: Board): Promise<void> {
        return this.boardService.delete(board)
    }
}

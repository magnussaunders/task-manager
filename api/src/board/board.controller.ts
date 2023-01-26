import {Body, Controller, Delete, Get, Param, Patch, Put} from '@nestjs/common';
import {BoardService} from "./board.service";
import {Board} from "./entities/board.entity";
import {TaskService} from "../task/task.service";
import {Task} from "../task/task.entity";

@Controller('board')
export class BoardController {
    constructor(
        private boardService: BoardService,
        private taskService: TaskService
    ) {}

    @Get()
    getAllBoards(): Promise<Board[]> {
        return this.boardService.findAll()
    }

    @Get(':boardId')
    getBoardById(@Param() params): Promise<Board> {
        return this.boardService.findById(params.boardId)
    }

    @Get(':boardId/tasks')
    getTasksForBoard(@Param() params): Promise<Task[]> {
        return this.taskService.getTasksForBoard(params.boardId)
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

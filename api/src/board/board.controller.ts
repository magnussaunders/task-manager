import {Body, Controller, Delete, Get, Param, Patch, Put} from '@nestjs/common';
import {BoardService} from "./board.service";
import {Board} from "./board.entity";
import {TaskService} from "../task/task.service";
import {Task} from "../task/task.entity";
import {Category} from "../category/category.entity";
import {Status} from "../status/status.entity";
import {Priority} from "../priority/priority.entity";
import {CategoryService} from "../category/category.service";
import {StatusService} from "../status/status.service";
import {PriorityService} from "../priority/priority.service";

@Controller('board')
export class BoardController {
    constructor(
        private boardService: BoardService,
        private taskService: TaskService,
        private categoryService: CategoryService,
        private statusService: StatusService,
        private priorityService: PriorityService
    ) {}

    @Get()
    getAllBoards(): Promise<Board[]> {
        return this.boardService.findAll()
    }

    @Get(':boardId')
    getBoardById(@Param() params): Promise<Board> {
        return this.boardService.findById(params.boardId)
    }

    @Get(':boardId/categories')
    getCategoriesForBoard(@Param() params): Promise<Category[]> {
        return this.categoryService.getCategoriesForBoard(params.boardId)
    }

    @Get(':boardId/statuses')
    getStatusesForBoard(@Param() params): Promise<Status[]> {
        return this.statusService.getStatusesForBoard(params.boardId)
    }

    @Get(':boardId/priorities')
    getPrioritiesForBoard(@Param() params): Promise<Priority[]> {
        return this.priorityService.getPrioritiesForBoard(params.boardId)
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

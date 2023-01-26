import {Body, Controller, Delete, Get, Param, Patch, Put} from '@nestjs/common';
import {BoardService} from "./board.service";
import {Board} from "./entities/board.entity";
import {TaskService} from "../task/task.service";
import {Task} from "../task/task.entity";
import {Category} from "../category/category.entity";
import {Status} from "./entities/status.entity";
import {Priority} from "./entities/priority.entity";
import {CategoryService} from "../category/category.service";

@Controller('board')
export class BoardController {
    constructor(
        private boardService: BoardService,
        private taskService: TaskService,
        private categoryService: CategoryService
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

    @Get(':boardId/status')
    getStatusesForBoard(@Param() params): Promise<Status[]> {
        return this.boardService.getStatusesForBoard(params.boardId)
    }

    @Put(':boardId/status')
    createStatusForBoard(@Param() params, @Body() status): Promise<Status> {
        return this.boardService.createStatusForBoard(params.boardId, status)
    }

    @Patch(':boardId/status/:statusId')
    updateStatusForBoard(@Param() params, @Body() status): Promise<Status> {
        return this.boardService.updateStatusForBoard(params.statusId, status)
    }

    @Delete(':boardId/status/:statusId')
    deleteStatusForBoard(@Param() params): Promise<void> {
        return this.boardService.deleteStatusForBoard(params.statusId)
    }

    @Get(':boardId/priority')
    getPrioritiesForBoard(@Param() params): Promise<Priority[]> {
        return this.boardService.getPrioritiesForBoard(params.boardId)
    }

    @Put(':boardId/priority')
    createPriorityForBoard(@Param() params, @Body() priority): Promise<Priority> {
        return this.boardService.createPriorityForBoard(params.boardId, priority)
    }

    @Patch(':boardId/priority/:priorityId')
    updatePriorityForBoard(@Param() params, @Body() priority): Promise<Priority> {
        return this.boardService.updatePriorityForBoard(params.priorityId, priority)
    }

    @Delete(':boardId/priority/:priorityId')
    deletePriorityForBoard(@Param() params): Promise<void> {
        return this.boardService.deletePriorityForBoard(params.priorityId)
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

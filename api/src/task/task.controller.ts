import {Body, Controller, Delete, Get, Param, Patch, Put} from '@nestjs/common';
import {TaskService} from "./task.service";
import {Task} from "./task.entity";

@Controller('task')
export class TaskController {
    constructor(
        private taskService: TaskService
    ) { }

    @Get(':taskId')
    getTicketById(@Param() params): Promise<Task> {
        return this.taskService.findById(params.taskId)
    }

    @Get('board/:boardId')
    getTasksForBoard(@Param() params): Promise<Task[]> {
        return this.taskService.findTasksByBoard(params.boardId)
    }

    @Put()
    createTicket(@Body() task: Task): Promise<Task> {
        return this.taskService.create(task)
    }

    @Patch()
    updateTask(@Body() task: Task): Promise<Task> {
        return this.taskService.update(task)
    }

    @Delete()
    deleteTask(@Body() task: Task): Promise<void> {
        return this.taskService.delete(task)
    }
}

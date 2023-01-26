import {Body, Controller, Delete, Get, Param, Patch, Put} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./user.entity";
import {Task} from "../task/task.entity";
import {BoardService} from "../board/board.service";
import {TaskService} from "../task/task.service";
import {Board} from "../board/board.entity";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private boardService: BoardService,
        private taskService: TaskService
    ) { }

    @Get()
    getAllUsers() {
        try {
            return this.userService.findAll()
        } catch (error) {
            return error
        }
    }

    @Get(':userId')
    async getUserById(@Param() params): Promise<User> {
        try {
            return await this.userService.findById(params.userId)
        } catch (error) {
            return error
        }
    }

    @Get(':userId/boards')
    async getBoardsForUser(@Param() params): Promise<Board[]> {
        return this.boardService.getBoardsForUser(params.userId)
    }

    @Get(':userId/tasks')
    async getTasksForUser(@Param() params): Promise<Task[]> {
        return this.taskService.getTasksForUser(params.userId)
    }

    @Put()
    createUser(@Body() user: User): Promise<User> {
        try {
            return this.userService.create(user)
        } catch (error) {
            return error
        }
    }

    @Patch()
    updateUser(@Body() user): Promise<User> {
        try {
            return this.userService.update(user)
        } catch (error) {
            return error
        }
    }

    @Delete()
    deleteUser(@Body() user): Promise<void> {
        try {
            return this.userService.delete(user)
        }catch (error) {
            return error
        }
    }
}

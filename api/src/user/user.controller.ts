import {Body, Controller, Delete, Get, Param, Patch, Put} from '@nestjs/common';
import {UserService} from "./user.service";
import {User} from "./user.entity";
import {Entitlement} from "./interfaces/entitlement.interface";
import {Task} from "../task/task.entity";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    getAllUsers() {
        try {
            return this.userService.getAllUsers()
        } catch (error) {
            return error
        }
    }

    @Get(':userId')
    async getUserById(@Param() params): Promise<User> {
        try {
            return await this.userService.getUserById(params.userId)
        } catch (error) {
            return error
        }
    }

    @Get(':userId/board-list')
    async getBoardListForUser(@Param() params): Promise<Entitlement[]> {
        return this.userService.getBoardListForUser(params.userId)
    }

    @Get(':userId/tasks')
    async getTasksForUser(@Param() params): Promise<Task[]> {
        return this.userService.getTasksForUser(params.userId)
    }

    @Put()
    createUser(@Body() user: User): Promise<User> {
        try {
            return this.userService.createUser(user)
        } catch (error) {
            return error
        }
    }

    @Patch()
    updateUser(@Body() user): Promise<User> {
        try {
            return this.userService.updateUser(user)
        } catch (error) {
            return error
        }
    }

    @Delete()
    deleteUser(@Body() user): Promise<void> {
        try {
            return this.userService.deleteUser(user)
        }catch (error) {
            return error
        }
    }
}

import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {Factory} from "../common/enums/factory.enum";
import {IdGenerator} from "../common/classes/id-generator.class";
import {Entitlement} from "./interfaces/entitlement.interface";
import {BoardService} from "../board/board.service";
import {TaskService} from "../task/task.service";
import {Task} from "../task/task.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private boardService: BoardService,
        private taskService: TaskService
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find()
    }

    findById(userId: string): Promise<User> {
        return this.userRepository.findOneBy({oid: userId})
    }

    async getBoardListForUser(userId: string): Promise<Entitlement[]> {
        let user = await this.findById(userId)
        return await this.boardService.addNameToEntitlements(user.entitlements)
    }

    async getTasksForUser(userId: string): Promise<Task[]> {
        let user = await this.findById(userId)
        let tasks: Task[] = []
        for (let entitlement of user.entitlements) {
            let boardTasks = await this.taskService.findTasksByBoard(entitlement.bid)
            for (let boardTask of boardTasks) {
                if (boardTask.assignees.includes(user.oid)) {
                    tasks.push(boardTask)
                }
            }
        }
        return tasks
    }

    async create(user: User): Promise<User> {
        user.oid = IdGenerator.generateId(Factory.User)
        return this.userRepository.save(user)
    }

    async update(user: User): Promise<User> {
        await this.userRepository.update({oid: user.oid}, user)
        return await this.userRepository.findOneBy({oid: user.oid})
    }

    async delete(user: User): Promise<void> {
        await this.userRepository.delete({userName: user.userName})
        return
    }
}
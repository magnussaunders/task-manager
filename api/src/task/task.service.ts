import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "./task.entity";
import {ArrayContains, Repository} from "typeorm";
import {IdGenerator} from "../common/classes/id-generator.class";
import {Factory} from "../common/enums/factory.enum";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) { }

    findTasksByBoard(boardId: string): Promise<Task[]> {
        return this.taskRepository.findBy({bid: boardId})
    }

    findById(taskId: string): Promise<Task> {
        return this.taskRepository.findOneBy({ oid: taskId })
    }

    getTasksForUser(userId: string): Promise<Task[]> {
        return this.taskRepository.createQueryBuilder('tasksForUser')
            .where({ assignees: ArrayContains([userId])})
            .getMany()
    }

    getTasksForBoard(boardId: string): Promise<Task[]> {
        return this.taskRepository.findBy({bid: boardId})
    }

    async create(task: Task): Promise<Task> {
        task.oid = IdGenerator.generateId(Factory.Task)
        return this.taskRepository.save(task)
    }

    async update(task: Task): Promise<Task> {
        await this.taskRepository.update({oid: task.oid}, task)
        return await this.taskRepository.findOneBy({oid: task.oid})
    }

    async delete(task: Task): Promise<void> {
        await this.taskRepository.delete({oid: task.oid})
        return
    }
}

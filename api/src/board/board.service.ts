import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ArrayContains, Repository} from "typeorm";
import {Board} from "./entities/board.entity";
import {Factory} from "../common/enums/factory.enum";
import {IdGenerator} from "../common/classes/id-generator.class";
import {Category} from "./entities/category.entity";
import {Status} from "./entities/status.entity";
import {Priority} from "./entities/priority.entity";

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private boardRepository: Repository<Board>,

        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,

        @InjectRepository(Status)
        private statusRepository: Repository<Status>,

        @InjectRepository(Priority)
        private priorityRepository: Repository<Priority>,
    ) {}

    findAll(): Promise<Board[]> {
        return this.boardRepository.find()
    }

    findById(boardId: string): Promise<Board> {
        return this.boardRepository.findOneBy({ oid: boardId })
    }

    getBoardsForUser(userId: string): Promise<Board[]> {
        return this.boardRepository.createQueryBuilder('boardsForUser')
            .where({members: ArrayContains([userId])})
            .getMany()
    }

    getCategoriesForBoard(boardId: string): Promise<Category[]> {
        return this.categoryRepository.findBy({bid: boardId})
    }

    getStatusesForBoard(boardId: string): Promise<Status[]> {
        return this.statusRepository.findBy({bid: boardId})
    }

    getPrioritiesForBoard(boardId: string): Promise<Priority[]> {
        return this.priorityRepository.findBy({bid: boardId})
    }

    create(board: Board): Promise<Board> {
        board.oid = IdGenerator.generateId(Factory.Board)
        return this.boardRepository.save(board)
    }

    createCategoryForBoard(boardId: string, category: Category): Promise<Category> {
        category.bid = boardId
        category.oid = IdGenerator.generateId(Factory.Category)
        return this.categoryRepository.save(category)
    }

    createStatusForBoard(boardId: string, status: Status): Promise<Status> {
        status.bid = boardId
        status.oid = IdGenerator.generateId(Factory.Status)
        return this.statusRepository.save(status)
    }

    createPriorityForBoard(boardId: string, priority: Priority): Promise<Priority> {
        priority.bid = boardId
        priority.oid = IdGenerator.generateId(Factory.Priority)
        return this.priorityRepository.save(priority)
    }

    async update(board: Board): Promise<Board> {
        await this.boardRepository.update({oid: board.oid}, board)
        return this.boardRepository.findOneBy({oid: board.oid})
    }

    async updateCategoryForBoard(categoryId: string,category: Category): Promise<Category> {
        await this.categoryRepository.update({oid: categoryId}, category)
        return this.categoryRepository.findOneBy({oid: categoryId})
    }

    async updateStatusForBoard(statusId: string,status: Status): Promise<Status> {
        await this.statusRepository.update({oid: statusId}, status)
        return this.statusRepository.findOneBy({oid: statusId})
    }

    async updatePriorityForBoard(priorityId: string,priority: Priority): Promise<Priority> {
        await this.priorityRepository.update({oid: priorityId}, priority)
        return this.priorityRepository.findOneBy({oid: priorityId})
    }

    async delete(board: Board): Promise<void> {
        await this.boardRepository.delete({oid: board.oid})
        return
    }

    async deleteCategoryForBoard(categoryId: string): Promise<void> {
        await this.categoryRepository.delete({oid: categoryId})
        return
    }

    async deleteStatusForBoard(statusId: string): Promise<void> {
        await this.statusRepository.delete({oid: statusId})
        return
    }

    async deletePriorityForBoard(priorityId: string): Promise<void> {
        await this.priorityRepository.delete({oid: priorityId})
        return
    }
}

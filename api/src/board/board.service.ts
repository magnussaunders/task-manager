import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ArrayContains, Repository} from "typeorm";
import {Board} from "./board.entity";
import {Factory} from "../common/enums/factory.enum";
import {IdGenerator} from "../common/classes/id-generator.class";
import {Priority} from "./entities/priority.entity";

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private boardRepository: Repository<Board>,

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

    getPrioritiesForBoard(boardId: string): Promise<Priority[]> {
        return this.priorityRepository.findBy({bid: boardId})
    }

    create(board: Board): Promise<Board> {
        board.oid = IdGenerator.generateId(Factory.Board)
        return this.boardRepository.save(board)
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

    async updatePriorityForBoard(priorityId: string,priority: Priority): Promise<Priority> {
        await this.priorityRepository.update({oid: priorityId}, priority)
        return this.priorityRepository.findOneBy({oid: priorityId})
    }

    async delete(board: Board): Promise<void> {
        await this.boardRepository.delete({oid: board.oid})
        return
    }

    async deletePriorityForBoard(priorityId: string): Promise<void> {
        await this.priorityRepository.delete({oid: priorityId})
        return
    }
}

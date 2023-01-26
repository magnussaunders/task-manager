import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
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

    // async getBoardsForUser(userId: string): Promise<Board[]> {
    //     let boards = await this.boardRepository.findBy({ members: ArrayContains([userId]) })
    //     boards.concat(await this.boardRepository.findBy({ owners: ArrayContains([userId]) }))
    //     return boards
    // }

    async create(board: Board): Promise<Board> {
        board.oid = IdGenerator.generateId(Factory.Board)
        return this.boardRepository.save(board)
    }

    async update(board: Board): Promise<Board> {
        await this.boardRepository.update({oid: board.oid}, board)
        return await this.boardRepository.findOneBy({oid: board.oid})
    }

    async delete(board: Board): Promise<void> {
        await this.boardRepository.delete({oid: board.oid})
        return
    }
}

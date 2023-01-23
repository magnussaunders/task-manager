import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Board} from "./board.entity";
import {Factory} from "../common/enums/factory.enum";
import {IdGenerator} from "../common/classes/id-generator.class";
import {ConfigOption} from "./interfaces/config-option.interface";
import {Entitlement} from "../user/interfaces/entitlement.interface";

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private boardRepository: Repository<Board>
    ) {}

    findAll(): Promise<Board[]> {
        return this.boardRepository.find()
    }

    findById(boardId: string): Promise<Board> {
        return this.boardRepository.findOneBy({ oid: boardId })
    }

    async addNameToEntitlements(entitlements: Entitlement[]): Promise<Entitlement[]> {
        for (let entitlement of entitlements) {
            let board = await this.findById(entitlement.bid)
            entitlement.boardName = board.name
        }
        return entitlements
    }

    async create(board: Board): Promise<Board> {
        board.oid = IdGenerator.generateId(Factory.Board)
        board = this.serializeConfigOptions(board)
        return this.boardRepository.save(board)
    }

    async update(board: Board): Promise<Board> {
        board = this.serializeConfigOptions(board)
        await this.boardRepository.update({oid: board.oid}, board)
        return await this.boardRepository.findOneBy({oid: board.oid})
    }

    async delete(board: Board): Promise<void> {
        await this.boardRepository.delete({oid: board.oid})
        return
    }

    serializeConfigOptions(board: Board): Board {
        if (board.categories) {
            board.categories.forEach((category: ConfigOption) => {
                category.oid = category.hasOwnProperty('oid') ? category.oid : IdGenerator.generateId(Factory.Category)
            })
        }
        if (board.statuses) {
            board.statuses.forEach((status: ConfigOption) => {
                status.oid = status.hasOwnProperty('oid') ? status.oid : IdGenerator.generateId(Factory.Status)
            })
        }
        if (board.priorities) {
            board.priorities.forEach((priority: ConfigOption) => {
                priority.oid = priority.hasOwnProperty('oid') ? priority.oid : IdGenerator.generateId(Factory.Priority)
            })
        }

        return board
    }
}

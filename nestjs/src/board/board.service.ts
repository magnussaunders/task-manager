import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Board} from "./board.entity";
import {ConfigurationItemType} from "../configuration-item/enums/configuration-item-type.enum";
import {ConfigurationItemService} from "../configuration-item/configuration-item.service";

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private boardRepository: Repository<Board>,
        private configurationItemService: ConfigurationItemService
    ) {}

    findAll(): Promise<Board[]> {
        return this.boardRepository.find()
    }

    findById(boardId: string): Promise<Board> {
        return this.boardRepository.findOneBy({ oid: boardId })
    }

    async create(board: Board): Promise<Board> {
        board.oid = await this.configurationItemService.generateId(ConfigurationItemType.Board)
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

import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Board} from "./board.entity";

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
        return this.boardRepository.findOneBy({ bid: boardId })
    }

    create(board: Board): Promise<Board> {
        return this.boardRepository.save(board)
    }

    update(board: Board): Promise<Board> {
        return this.boardRepository.save(board)
    }

    async delete(boardId: string): Promise<void> {
        await this.boardRepository.delete({bid: boardId})
        return
    }
}

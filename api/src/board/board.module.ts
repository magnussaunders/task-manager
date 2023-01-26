import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Board} from "./entities/board.entity";
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import {TaskModule} from "../task/task.module";
import {Category} from "./entities/category.entity";
import {Status} from "./entities/status.entity";
import {Priority} from "./entities/priority.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([Board, Category, Status, Priority]),
        TaskModule
    ],
    providers: [BoardService],
    controllers: [BoardController],
    exports: [BoardService]
})
export class BoardModule {}
import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Board} from "./entities/board.entity";
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import {TaskModule} from "../task/task.module";
import {Category} from "../category/category.entity";
import {Status} from "./entities/status.entity";
import {Priority} from "./entities/priority.entity";
import {CategoryModule} from "../category/category.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([Board, Category, Status, Priority]),
        TaskModule,
        CategoryModule
    ],
    providers: [BoardService],
    controllers: [BoardController],
    exports: [BoardService]
})
export class BoardModule {}
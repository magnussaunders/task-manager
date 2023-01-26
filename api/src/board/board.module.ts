import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Board} from "./board.entity";
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import {TaskModule} from "../task/task.module";
import {Category} from "../category/category.entity";
import {Status} from "../status/status.entity";
import {Priority} from "../priority/priority.entity";
import {CategoryModule} from "../category/category.module";
import {StatusModule} from "../status/status.module";
import {PriorityModule} from "../priority/priority.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([Board, Category, Status, Priority]),
        TaskModule,
        CategoryModule,
        StatusModule,
        PriorityModule
    ],
    providers: [BoardService],
    controllers: [BoardController],
    exports: [BoardService]
})
export class BoardModule {}
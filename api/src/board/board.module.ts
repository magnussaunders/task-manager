import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Board} from "./board.entity";
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import {TaskModule} from "../task/task.module";


@Module({
    imports: [TypeOrmModule.forFeature([Board]), TaskModule],
    providers: [BoardService],
    controllers: [BoardController],
    exports: [BoardService]
})
export class BoardModule {}
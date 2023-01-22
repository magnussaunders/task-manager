import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Board} from "./board.entity";
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import {ConfigurationItemService} from "../configuration-item/configuration-item.service";

@Module({
    imports: [TypeOrmModule.forFeature([Board])],
    providers: [BoardService, ConfigurationItemService],
    controllers: [BoardController]
})
export class BoardModule {}
import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {BoardModule} from "../board/board.module";
import {TaskModule} from "../task/task.module";

@Module({
    imports:[TypeOrmModule.forFeature([User]), BoardModule, TaskModule],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule { }

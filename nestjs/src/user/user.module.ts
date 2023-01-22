import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {ConfigurationItemService} from "../configuration-item/configuration-item.service";

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    providers: [UserService, ConfigurationItemService],
    controllers: [UserController]
})
export class UserModule { }

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { BoardModule } from './board/board.module';
import {Board} from "./board/board.entity";
import { UserModule } from './user/user.module';
import {User} from "./user/user.entity";
import { TaskModule } from './task/task.module';
import {Task} from "./task/task.entity";
import {Category} from "./category/category.entity";
import {Priority} from "./priority/priority.entity";
import {Status} from "./status/status.entity";
import { CategoryModule } from './category/category.module';
import { StatusModule } from './status/status.module';
import { PriorityModule } from './priority/priority.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DB,
      entities: [Board, Category, Status, Priority, User, Task],
      synchronize: true,
    }),
    BoardModule,
    UserModule,
    TaskModule,
    CategoryModule,
    StatusModule,
    PriorityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { BoardModule } from './board/board.module';
import {Board} from "./board/entities/board.entity";
import { UserModule } from './user/user.module';
import {User} from "./user/user.entity";
import { TaskModule } from './task/task.module';
import {Task} from "./task/task.entity";
import {Category} from "./board/entities/category.entity";
import {Priority} from "./board/entities/priority.entity";
import {Status} from "./board/entities/status.entity";

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
    TaskModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

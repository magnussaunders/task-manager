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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      username: 'nestjs',
      password: 'thisisNest123',
      database: 'demo-api-db',
      entities: [Board, User, Task],
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

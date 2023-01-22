import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { BoardModule } from './board/board.module';
import {Board} from "./board/board.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      username: 'nestjs',
      password: 'thisisNest123',
      database: 'demo-api-db',
      entities: [Board, ],
      synchronize: true,
    }),
    BoardModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

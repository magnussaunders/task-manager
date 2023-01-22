import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    getAllUsers(): Promise<User[]> {
        return this.usersRepository.find()
    }

    getUserByUsername(username: string): Promise<User> {
        return this.usersRepository.findOneBy({userName: username})
    }

    async createUser(user: User): Promise<User> {
        return this.usersRepository.save(user)
    }

    async updateUser(user: User): Promise<User> {
        return this.usersRepository.save(user)
    }

    async deleteUser(user: User): Promise<void> {
        await this.usersRepository.delete({userName: user.userName})
        return
    }
}

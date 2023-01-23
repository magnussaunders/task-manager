import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {Factory} from "../common/enums/factory.enum";
import {IdGenerator} from "../common/classes/id-generator.class";
import {Entitlement} from "./interfaces/entitlement.interface";
import {BoardService} from "../board/board.service";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private boardService: BoardService
    ) {}

    getAllUsers(): Promise<User[]> {
        return this.userRepository.find()
    }

    getUserById(userId: string): Promise<User> {
        return this.userRepository.findOneBy({oid: userId})
    }

    async getBoardListForUser(userId: string): Promise<Entitlement[]> {
        let user = await this.getUserById(userId)
        return await this.boardService.addNameToEntitlements(user.entitlements)
    }

    async createUser(user: User): Promise<User> {
        user.oid = IdGenerator.generateId(Factory.User)
        return this.userRepository.save(user)
    }

    async updateUser(user: User): Promise<User> {
        await this.userRepository.update({oid: user.oid}, user)
        return await this.userRepository.findOneBy({oid: user.oid})
    }

    async deleteUser(user: User): Promise<void> {
        await this.userRepository.delete({userName: user.userName})
        return
    }
}

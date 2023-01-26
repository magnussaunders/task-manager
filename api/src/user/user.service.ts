import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {Factory} from "../common/enums/factory.enum";
import {IdGenerator} from "../common/classes/id-generator.class";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find()
    }

    findById(userId: string): Promise<User> {
        return this.userRepository.findOneBy({oid: userId})
    }

    async create(user: User): Promise<User> {
        user.oid = IdGenerator.generateId(Factory.User)
        return this.userRepository.save(user)
    }

    async update(user: User): Promise<User> {
        await this.userRepository.update({oid: user.oid}, user)
        return await this.userRepository.findOneBy({oid: user.oid})
    }

    async delete(user: User): Promise<void> {
        await this.userRepository.delete({username: user.username})
        return
    }
}

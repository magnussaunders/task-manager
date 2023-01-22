import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {ConfigurationItemService} from "../configuration-item/configuration-item.service";
import {ConfigurationItemType} from "../configuration-item/enums/configuration-item-type.enum";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private configurationItemService: ConfigurationItemService
    ) {}

    getAllUsers(): Promise<User[]> {
        return this.userRepository.find()
    }

    getUserById(userId: string): Promise<User> {
        return this.userRepository.findOneBy({oid: userId})
    }

    async createUser(user: User): Promise<User> {
        user.oid = await this.configurationItemService.generateId(ConfigurationItemType.User)
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

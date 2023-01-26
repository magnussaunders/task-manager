import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Priority} from "./priority.entity";
import {Repository} from "typeorm";
import {IdGenerator} from "../common/classes/id-generator.class";
import {Factory} from "../common/enums/factory.enum";

@Injectable()
export class PriorityService {
    constructor(
        @InjectRepository(Priority)
        private priorityRepository: Repository<Priority>
    ) {}

    findById(priorityId: string): Promise<Priority> {
        return this.priorityRepository.findOneBy({ oid: priorityId })
    }

    getPrioritiesForBoard(boardId: string): Promise<Priority[]> {
        return this.priorityRepository.findBy({bid: boardId})
    }

    create(priority: Priority): Promise<Priority> {
        priority.oid = IdGenerator.generateId(Factory.Priority)
        return this.priorityRepository.save(priority)
    }

    async update(priorityId: string,priority: Priority): Promise<Priority> {
        await this.priorityRepository.update({oid: priorityId}, priority)
        return this.priorityRepository.findOneBy({oid: priorityId})
    }

    async delete(priorityId: string): Promise<void> {
        await this.priorityRepository.delete({oid: priorityId})
        return
    }
}

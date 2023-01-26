import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Status} from "./status.entity";
import {Repository} from "typeorm";
import {IdGenerator} from "../common/classes/id-generator.class";
import {Factory} from "../common/enums/factory.enum";

@Injectable()
export class StatusService {
    constructor(
        @InjectRepository(Status)
        private statusRepository: Repository<Status>
    ) {}

    findById(statusId: string): Promise<Status> {
        return this.statusRepository.findOneBy({ oid: statusId })
    }

    getStatusesForBoard(boardId: string): Promise<Status[]> {
        return this.statusRepository.findBy({bid: boardId})
    }

    create(status: Status): Promise<Status> {
        status.oid = IdGenerator.generateId(Factory.Status)
        return this.statusRepository.save(status)
    }

    async update(statusId: string,status: Status): Promise<Status> {
        await this.statusRepository.update({oid: statusId}, status)
        return this.statusRepository.findOneBy({oid: statusId})
    }

    async delete(statusId: string): Promise<void> {
        await this.statusRepository.delete({oid: statusId})
        return
    }
}

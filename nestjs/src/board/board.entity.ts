import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";
import {Member} from "./interfaces/member.interface";
import {ConfigOption} from "./interfaces/config-option.interface";

@Entity()
export class Board {
    @ObjectIdColumn()
    _id: ObjectID

    @Column()
    oid: string

    @Column()
    name: string

    @Column()
    members: Member[]

    @Column()
    statuses: ConfigOption[]

    @Column()
    categories: ConfigOption[]

    @Column()
    priorities: ConfigOption[]
}
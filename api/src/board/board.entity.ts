import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";
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
    owners: string[]

    @Column()
    members: string[]

    @Column()
    statuses: ConfigOption[]

    @Column()
    categories: ConfigOption[]

    @Column()
    priorities: ConfigOption[]
}
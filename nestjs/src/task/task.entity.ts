import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";
import {User} from "../user/user.entity";
import {Activity} from "./interfaces/activity.interface";

@Entity()
export class Task {
    @ObjectIdColumn()
    _id: ObjectID

    @Column()
    oid: string

    @Column()
    bid: string

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    notes: string

    @Column()
    startDate: Date

    @Column()
    dueDate: Date

    @Column()
    assignees: User[]

    @Column()
    category: string

    @Column()
    status: string

    @Column()
    priority: string

    @Column()
    activities: Activity[]
}
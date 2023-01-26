import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    _id: string

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

    @Column(
        'text',
        {
            array: true
        }
    )
    assignees: string[]

    @Column()
    category: string

    @Column()
    status: string

    @Column()
    priority: string
}
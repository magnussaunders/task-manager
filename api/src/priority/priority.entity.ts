import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Priority {
    @PrimaryGeneratedColumn()
    _id: string

    @Column()
    oid: string

    @Column()
    bid: string

    @Column()
    name: string

    @Column()
    color: string
}
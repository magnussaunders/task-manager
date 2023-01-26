import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Status {
    @PrimaryGeneratedColumn()
    _id: string

    @Column()
    oid: string

    @Column()
    name: string

    @Column()
    color: string
}
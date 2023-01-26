import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Category {
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
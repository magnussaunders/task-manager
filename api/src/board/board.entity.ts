import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    _id: string

    @Column()
    oid: string

    @Column()
    name: string

    @Column(
        'text',
        {
            array: true
        }
    )
    members: string[]

    @Column()
    color: string
}
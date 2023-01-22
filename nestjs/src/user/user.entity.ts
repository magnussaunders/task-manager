import {Entity, Column, ObjectIdColumn} from 'typeorm'

@Entity()
export class User {
    @ObjectIdColumn()
    _id: string

    @Column()
    userFirstName: string

    @Column()
    userLastName: string

    @Column()
    userName: string

    @Column()
    passwordHash: string
}
import {Entity, Column, ObjectIdColumn, ObjectID} from 'typeorm'

@Entity()
export class User {
    @ObjectIdColumn()
    _id: ObjectID

    @Column()
    oid: string

    @Column()
    userFirstName: string

    @Column()
    userLastName: string

    @Column()
    userName: string

    @Column()
    passwordHash: string
}
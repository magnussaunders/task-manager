import {Entity, Column, ObjectID, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
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
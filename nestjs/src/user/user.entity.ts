import {Entity, Column, ObjectIdColumn, ObjectID} from 'typeorm'
import {Entitlement} from "./interfaces/entitlement.interface";

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

    @Column()
    entitlements: Entitlement[]
}
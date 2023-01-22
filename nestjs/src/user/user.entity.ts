import {Entity, Column} from 'typeorm'
import {ConfigurationItem} from "../configuration-item/configuration-item.entity";

@Entity()
export class User extends ConfigurationItem {
    @Column()
    userFirstName: string

    @Column()
    userLastName: string

    @Column()
    userName: string

    @Column()
    passwordHash: string
}
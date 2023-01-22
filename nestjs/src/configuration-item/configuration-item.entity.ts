import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity()
export class ConfigurationItem {
    @ObjectIdColumn()
    _id: ObjectID

    @Column()
    oid: string
}
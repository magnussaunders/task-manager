import {Column, Entity} from "typeorm";
import {Member} from "./interfaces/member.interface";
import {ConfigOption} from "./interfaces/config-option.interface";
import {ConfigurationItem} from "../configuration-item/configuration-item.entity";

@Entity()
export class Board extends ConfigurationItem {
    @Column()
    name: string

    @Column()
    members: Member[]

    @Column()
    statuses: ConfigOption[]

    @Column()
    categories: ConfigOption[]

    @Column()
    priorities: ConfigOption[]
}
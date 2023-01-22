import {Injectable} from '@nestjs/common';
import {ConfigurationItemType} from "./enums/configuration-item-type.enum";

@Injectable()
export class ConfigurationItemService {
    generateId(configurationItemType: ConfigurationItemType) {
        return configurationItemType + Date.now()
    }
}

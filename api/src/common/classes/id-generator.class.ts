import {Factory} from "../enums/factory.enum";

export class IdGenerator {
    public static generateId(factory: Factory) {
        return factory + ':' + Date.now()
    }
}
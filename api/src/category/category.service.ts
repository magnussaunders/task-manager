import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "./category.entity";
import {Repository} from "typeorm";
import {IdGenerator} from "../common/classes/id-generator.class";
import {Factory} from "../common/enums/factory.enum";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) {}

    findById(categoryId: string): Promise<Category> {
        return this.categoryRepository.findOneBy({ oid: categoryId })
    }

    getCategoriesForBoard(boardId: string): Promise<Category[]> {
        return this.categoryRepository.findBy({bid: boardId})
    }

    create(category: Category): Promise<Category> {
        category.oid = IdGenerator.generateId(Factory.Category)
        return this.categoryRepository.save(category)
    }

    async update(categoryId: string,category: Category): Promise<Category> {
        await this.categoryRepository.update({oid: categoryId}, category)
        return this.categoryRepository.findOneBy({oid: categoryId})
    }

    async delete(categoryId: string): Promise<void> {
        await this.categoryRepository.delete({oid: categoryId})
        return
    }
}

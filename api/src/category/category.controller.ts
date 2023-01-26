import {Body, Controller, Delete, Get, Param, Patch, Put} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {Category} from "./category.entity";

@Controller('category')
export class CategoryController {
    constructor(
        private categoryService: CategoryService
    ) {}

    @Get(':categoryId')
    getCategoryById(@Param() params): Promise<Category> {
        return this.categoryService.findById(params.categoryId)
    }

    @Put()
    createCategory(@Body() category: Category): Promise<Category> {
        return this.categoryService.create(category)
    }

    @Patch(':categoryId')
    updateCategory(@Param() params, @Body() category: Category): Promise<Category> {
        return this.categoryService.update(params.categoryId, category)
    }

    @Delete(':categoryId')
    deleteCategory(@Param() params): Promise<void> {
        return this.categoryService.delete(params.categoryId)
    }
}

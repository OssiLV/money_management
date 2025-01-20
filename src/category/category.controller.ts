import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { TransactionType } from 'src/enum';

@Controller('categories')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    async createCategory(
        @Body() createCategoryDto: CreateCategoryDto,
    ): Promise<Category> {
        return await this.categoryService.createCategory(createCategoryDto);
    }

    // Update a user by ID
    @Put('/:Id')
    async updateCategory(
        @Param('Id') Id: string,
        @Body() data: UpdateCategoryDto,
    ) {
        const category = new Category();
        Object.assign(category, data);
        await this.categoryService.updateCategory(Id, category);
        return { message: 'Category info successfully updated', Id };
    }

    @Get()
    getAllCategories(
        @Query('userId') userId: string,
        @Query('transType') transType: TransactionType,
    ): Promise<Category[]> {
        return this.categoryService.getAllCategoriesByUserId(userId, transType);
    }
}

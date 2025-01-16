import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { isUUID, isValidTransactionType } from 'src/lib';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';
import { TransactionType } from 'src/enum';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        private userService: UserService,
    ) {}

    async createCategory(
        createCategoryDto: CreateCategoryDto,
    ): Promise<Category> {
        const { categoryName, transType, userId } = createCategoryDto;
        if (userId != null && userId != '') {
            const user = await this.userService.getUserById(userId);

            const category = this.categoryRepository.create({
                categoryName,
                transType,
                user,
            });
            await this.categoryRepository.save(category);
            return category;
        } else {
            const category = this.categoryRepository.create({
                categoryName,
                transType,
            });
            await this.categoryRepository.save(category);
            return category;
        }
    }

    async getCategoryById(Id: string): Promise<Category> {
        const found = await this.categoryRepository.findOne({ where: { Id } });
        if (!found) {
            throw new NotFoundException(`Category "${Id}" not found`);
        }
        return found;
    }

    async updateUser(Id: string, updateCategoryDto: UpdateCategoryDto) {
        const hasCategory = await this.getCategoryById(Id);
        if (!hasCategory) throw new Error(`A category "${Id}" was not found`);
        await this.categoryRepository.update(Id, updateCategoryDto);
    }

    async getAllCategories(): Promise<Category[]> {
        return this.categoryRepository.find({
            relations: { user: true },
            select: {
                user: {
                    Id: true,
                },
            },
        });
    }

    async getAllCategoriesByUserId(
        userId: string | null,
        transType: TransactionType,
    ): Promise<Category[]> {
        let categories: Category[];
        console.log({ userId, transType });

        if (userId === undefined && transType === undefined) {
            categories = await this.getAllCategories();
            return categories;
        }

        if (transType !== undefined) {
            if (transType.trim().length == 0) {
                throw new BadRequestException('Invalid value for transType');
            } else if (
                transType.trim().length > 0 &&
                !isValidTransactionType(transType.trim())
            ) {
                throw new BadRequestException(
                    'Invalid "Transaction Type" value. Try input uppercase value',
                );
            }
        }
        if (userId !== undefined) {
            if (userId.trim().length == 0) {
                throw new BadRequestException('Invalid value for userId');
            } else if (
                userId.trim().length > 0 &&
                !isUUID(userId.trim()) &&
                userId.trim().toLocaleLowerCase() !== 'null'
            ) {
                throw new BadRequestException('Invalid UUID format for userId');
            } else if (userId.trim().toLocaleLowerCase() === 'null') {
                if (transType === undefined) {
                    categories = await this.categoryRepository
                        .createQueryBuilder('category')
                        .leftJoinAndSelect('category.user', 'user')
                        .where('category.userId IS NULL')
                        .getMany();
                    return categories;
                } else if (transType.trim().length > 0) {
                    categories = await this.categoryRepository
                        .createQueryBuilder('category')
                        .leftJoinAndSelect('category.user', 'user')
                        .where('category.userId IS NULL')
                        .andWhere(
                            `category.transType = '${transType.toUpperCase()}'`,
                        )
                        .getMany();
                    return categories;
                }
            }
        }
        console.log('out');

        const hasUser = await this.userService.getUserById(userId);
        if (!hasUser) {
            throw new NotFoundException(`User "${userId}" not found`);
        }

        categories = await this.categoryRepository.find({
            where: { user: { Id: userId }, transType: transType },
            relations: { user: true },
            select: { user: { Id: true } },
        });

        return categories;
    }
}

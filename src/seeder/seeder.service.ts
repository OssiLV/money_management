import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';
import { TransactionType } from 'src/enum';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
    constructor(
        @InjectRepository(Category)
        private categoryTypeRepository: Repository<Category>,
    ) {}

    async categorySeed(): Promise<object> {
        let countCategoriesSeeding = 0;
        let countExistCategoriesSeeding = 0;

        const categories = [
            // INCOME
            {
                categoryName: 'Tiền lương',
                transType: TransactionType.INCOME,
            },
            { categoryName: 'Tiền mặt', transType: TransactionType.INCOME },
            {
                categoryName: 'Tiền tiết kiệm',
                transType: TransactionType.INCOME,
            },
            { categoryName: 'Tiền thưởng', transType: TransactionType.INCOME },
            { categoryName: 'Cổ phần', transType: TransactionType.INCOME },
            { categoryName: 'Trái phiếu', transType: TransactionType.INCOME },
            { categoryName: 'Kinh doanh', transType: TransactionType.INCOME },
            { categoryName: 'Khác', transType: TransactionType.INCOME },
            // EXPENSE
            {
                categoryName: 'Thức ăn',
                transType: TransactionType.Expense,
                children: [
                    {
                        categoryName: 'Trái cây',
                        transType: TransactionType.Expense,
                    },
                    {
                        categoryName: 'Ăn sáng',
                        transType: TransactionType.Expense,
                    },
                    {
                        categoryName: 'Ăn trưa',
                        transType: TransactionType.Expense,
                    },
                    {
                        categoryName: 'Ăn chiều',
                        transType: TransactionType.Expense,
                    },
                    {
                        categoryName: 'Ăn tối',
                        transType: TransactionType.Expense,
                    },
                ],
            },

            {
                categoryName: 'Phương tiện',
                transType: TransactionType.Expense,
                children: [
                    {
                        categoryName: 'Xăng',
                        transType: TransactionType.Expense,
                    },
                    {
                        categoryName: 'Xe Bus',
                        transType: TransactionType.Expense,
                    },
                    {
                        categoryName: 'Sửa xe',
                        transType: TransactionType.Expense,
                    },
                ],
            },

            {
                categoryName: 'Y tế',
                transType: TransactionType.Expense,
                children: [
                    {
                        categoryName: 'Khám bệnh',
                        transType: TransactionType.Expense,
                    },
                    {
                        categoryName: 'Nha khoa',
                        transType: TransactionType.Expense,
                    },
                    {
                        categoryName: 'Thuốc',
                        transType: TransactionType.Expense,
                    },
                ],
            },
            {
                categoryName: 'Khác',
                transType: TransactionType.Expense,
                children: [
                    {
                        categoryName: 'Thể thao',
                        transType: TransactionType.Expense,
                    },
                    {
                        categoryName: 'Mua sắm',
                        transType: TransactionType.Expense,
                    },
                    {
                        categoryName: 'Tiệc tùng',
                        transType: TransactionType.Expense,
                    },
                    {
                        categoryName: 'Thú cưng',
                        transType: TransactionType.Expense,
                    },
                ],
            },
        ];

        for (const category of categories) {
            const exists = await this.categoryTypeRepository.findOne({
                where: { categoryName: category.categoryName },
            });
            if (!exists) {
                if (category.children?.length > 0) {
                    const newParentCategory =
                        await this.categoryTypeRepository.save({
                            categoryName: category.categoryName,
                            transType: category.transType,
                        });
                    for (const childcategory of category.children) {
                        await this.categoryTypeRepository.save({
                            categoryName: childcategory.categoryName,
                            transType: childcategory.transType,
                            parent: newParentCategory,
                        });
                        countCategoriesSeeding++;
                    }
                } else {
                    await this.categoryTypeRepository.save({
                        categoryName: category.categoryName,
                        transType: category.transType,
                    });
                }

                countCategoriesSeeding++;
            } else {
                countExistCategoriesSeeding++;
            }
        }
        return {
            name: 'category',
            seeding: countCategoriesSeeding,
            exist: countExistCategoriesSeeding,
            status: 'Completed',
        };
    }
}

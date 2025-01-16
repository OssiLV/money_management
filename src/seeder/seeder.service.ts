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
            { categoryName: 'Tiền lương', transType: TransactionType.INCOME },
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
            { categoryName: 'Thức ăn', transType: TransactionType.Expense },
            { categoryName: 'Trái cây', transType: TransactionType.Expense },
            { categoryName: 'Ăn sáng', transType: TransactionType.Expense },
            { categoryName: 'Ăn trưa', transType: TransactionType.Expense },
            { categoryName: 'Ăn chiều', transType: TransactionType.Expense },
            { categoryName: 'Ăn tối', transType: TransactionType.Expense },
            { categoryName: 'Xe', transType: TransactionType.Expense },
            { categoryName: 'Xăng', transType: TransactionType.Expense },
            { categoryName: 'Khám bệnh', transType: TransactionType.Expense },
            { categoryName: 'Nha khoa', transType: TransactionType.Expense },
            { categoryName: 'Thuốc', transType: TransactionType.Expense },
            { categoryName: 'Game', transType: TransactionType.Expense },
            { categoryName: 'Thể thao', transType: TransactionType.Expense },
            { categoryName: 'Mua sắm', transType: TransactionType.Expense },
            { categoryName: 'Tiệc tùng', transType: TransactionType.Expense },
            { categoryName: 'Thú cưng', transType: TransactionType.Expense },
        ];

        for (const category of categories) {
            const exists = await this.categoryTypeRepository.findOne({
                where: { categoryName: category.categoryName },
            });
            if (!exists) {
                await this.categoryTypeRepository.save(category);

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

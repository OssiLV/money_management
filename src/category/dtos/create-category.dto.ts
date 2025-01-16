import { IsNotEmpty, IsEnum } from 'class-validator';
import { TransactionType } from 'src/enum';

export class CreateCategoryDto {
    @IsNotEmpty({ message: 'categoryName field cannot be empty' })
    categoryName: string;

    @IsNotEmpty({ message: 'transType field cannot be empty' })
    @IsEnum(TransactionType)
    transType: TransactionType;

    userId: string;
}

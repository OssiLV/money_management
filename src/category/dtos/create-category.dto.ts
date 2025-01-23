import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { TransactionType } from 'src/enum';

export class CreateCategoryDto {
    @ApiProperty({ example: 'Food', required: true })
    @IsNotEmpty({ message: 'categoryName field cannot be empty' })
    categoryName: string;

    @ApiProperty({ enum: TransactionType, example: 'INCOME', required: true })
    @IsNotEmpty({ message: 'transType field cannot be empty' })
    @IsEnum(TransactionType)
    transType: TransactionType;

    userId: string;
}

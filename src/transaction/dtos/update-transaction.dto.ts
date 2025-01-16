import { IsNotEmpty, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { TransactionType } from 'src/enum';

export class UpdateTransactionDto {
    @IsOptional({})
    description: string;

    @IsNotEmpty({ message: 'transDate field cannot be empty' })
    transDate: string;

    @IsNumber({})
    amount: number;

    @IsEnum(TransactionType)
    transType: TransactionType;
}

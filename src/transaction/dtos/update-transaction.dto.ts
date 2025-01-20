import { IsEnum, IsOptional, IsNumber, IsDate, IsUUID } from 'class-validator';
import { TransactionType } from 'src/enum';

export class UpdateTransactionDto {
    @IsOptional({})
    description: string;

    @IsDate({})
    transDate: string;

    @IsNumber({})
    amount: number;

    @IsEnum(TransactionType)
    transType: TransactionType;

    @IsUUID()
    categoryId: string;

    @IsUUID()
    ledgerId: string;
}

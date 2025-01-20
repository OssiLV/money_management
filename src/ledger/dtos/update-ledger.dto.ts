import { IsNotEmpty, IsOptional, IsNumber, IsUUID } from 'class-validator';

export class UpdateLedgerDto {
    @IsNotEmpty({ message: 'ledgerName field cannot be empty' })
    ledgerName: string;

    @IsOptional()
    description: string;

    @IsNumber()
    incomeTotalAmount: number;

    @IsNumber()
    expenseTotalAmount: number;

    @IsNotEmpty({ message: 'userId field cannot be empty' })
    @IsUUID()
    userId: string;
}

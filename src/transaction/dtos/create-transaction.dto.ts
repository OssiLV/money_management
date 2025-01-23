import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsNumber, IsDate, IsUUID } from 'class-validator';
import { TransactionType } from 'src/enum';

export class CreateTransactionDto {
    @ApiProperty({ example: 'this is description', required: false })
    @IsOptional({})
    description: string;

    @ApiProperty({ required: true })
    @IsDate({})
    transDate: Date;

    @ApiProperty({ default: 0, required: true })
    @IsNumber({})
    amount: number;

    @ApiProperty({ enum: TransactionType, required: true })
    @IsEnum(TransactionType)
    transType: TransactionType;

    @ApiProperty({
        example: 'E3CED2A7-E7D6-EF11-AD54-346F24988D40',
        description: 'UUID value',
        required: true,
    })
    @IsUUID()
    categoryId: string;

    @ApiProperty({
        example: 'C258D717-27D7-EF11-AD54-346F24988D40',
        description: 'UUID value',
        required: true,
    })
    @IsUUID()
    ledgerId: string;
}

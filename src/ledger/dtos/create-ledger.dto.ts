import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsUUID } from 'class-validator';

export class CreateLedgerDto {
    @ApiProperty({ example: 'Education', required: true })
    @IsNotEmpty({ message: 'ledgerName field cannot be empty' })
    ledgerName: string;

    @ApiProperty({ example: 'This is description', required: false })
    @IsOptional()
    description: string;

    @ApiProperty({ default: 0, required: true })
    @IsNumber()
    incomeTotalAmount: number;

    @ApiProperty({ default: 0, required: true })
    @IsNumber()
    expenseTotalAmount: number;

    @ApiProperty({
        example: 'C258D717-27D7-EF11-AD54-346F24988D40',
        description: 'UUID value',
        required: true,
    })
    @IsNotEmpty({ message: 'userId field cannot be empty' })
    @IsUUID()
    userId: string;
}

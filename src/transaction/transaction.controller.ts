import { Body, Controller, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dtos';
import { Transaction } from './transaction.entity';

@Controller('trans')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post()
    createTrans(
        @Body() createTransactionDto: CreateTransactionDto,
    ): Promise<Transaction> {
        return this.transactionService.createTrans(createTransactionDto);
    }
}

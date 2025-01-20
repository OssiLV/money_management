import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto, UpdateTransactionDto } from './dtos';
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

    @Delete('/:Id')
    deleteTrans(@Param('Id') Id: string) {
        return this.transactionService.deleteTrans(Id);
    }

    @Put('/:Id')
    async updateNote(
        @Param('Id') Id: string,
        @Body() data: UpdateTransactionDto,
    ) {
        // const trans = new Transaction();

        // Object.assign(trans, data);
        await this.transactionService.updateTrans(Id, data);
        return { message: 'User info successfully updated', Id };
    }
}

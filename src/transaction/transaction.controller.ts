import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto, UpdateTransactionDto } from './dtos';
import { Transaction } from './transaction.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Transaction') // Swagger tag
@Controller('trans')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @ApiBody({ type: CreateTransactionDto })
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

    @ApiBody({ type: UpdateTransactionDto })
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

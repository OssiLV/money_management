import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dtos';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private transRepository: Repository<Transaction>,
    ) {}

    async createTrans(
        createTransactionDto: CreateTransactionDto,
    ): Promise<Transaction> {
        const { amount, description, transDate, transType } =
            createTransactionDto;
        const trans = this.transRepository.create({
            amount,
            description,
            transDate,
            transType,
        });
        await this.transRepository.save(trans);
        return trans;
    }
}

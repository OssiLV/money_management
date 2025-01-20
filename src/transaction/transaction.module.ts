import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { CategoryModule } from 'src/category/category.module';
import { LedgerModule } from 'src/ledger/ledger.module';

@Module({
    imports: [
        LedgerModule,
        CategoryModule,
        TypeOrmModule.forFeature([Transaction]),
    ],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}

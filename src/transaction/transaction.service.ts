import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto, UpdateTransactionDto } from './dtos';
import { CategoryService } from 'src/category/category.service';
import { LedgerService } from 'src/ledger/ledger.service';
import { isUUID } from 'src/lib';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private transRepository: Repository<Transaction>,
        private categoryService: CategoryService,
        private ledgerService: LedgerService,
    ) {}

    async getTransById(Id: string): Promise<Transaction> {
        if (!isUUID(Id)) {
            throw new BadRequestException('Invalid UUID format for userId');
        }
        const found = await this.transRepository.findOne({
            where: { Id },
            relations: { category: true, ledger: { user: true } },
            select: {
                category: { Id: true, categoryName: true },
                ledger: {
                    Id: true,
                    ledgerName: true,
                    user: { Id: true, firstName: true, lastName: true },
                },
            },
        });
        if (!found) {
            throw new NotFoundException(`Transaction "${Id}" not found`);
        }
        return found;
    }

    async createTrans(
        createTransactionDto: CreateTransactionDto,
    ): Promise<Transaction> {
        const {
            amount,
            description,
            transDate,
            transType,
            categoryId,
            ledgerId,
        } = createTransactionDto;
        const ledger = await this.ledgerService.getLedgerById(ledgerId);
        const category = await this.categoryService.getCategoryById(categoryId);
        const trans = this.transRepository.create({
            amount,
            description,
            transDate,
            transType,
            category,
            ledger,
        });
        await this.transRepository.save(trans);
        return this.getTransById(trans.Id);
    }

    async deleteTrans(Id: string) {
        if (!isUUID(Id)) {
            throw new BadRequestException('Invalid UUID format for userId');
        }
        const result = await this.transRepository.delete(Id);
        if (result.affected === 0) {
            throw new NotFoundException(`A transaction "${Id}" was not found`);
        }
        return { message: 'Transaction successfully deleted' };
    }

    async updateTrans(Id: string, updateTransDto: UpdateTransactionDto) {
        if (!isUUID(Id)) {
            throw new BadRequestException('Invalid UUID format for userId');
        }
        const hasTrans = await this.getTransById(Id);
        if (!hasTrans) throw new Error(`A transction "${Id}" was not found`);
        const {
            amount,
            categoryId,
            description,
            transDate,
            transType,
            ledgerId,
        } = updateTransDto;
        const ledger = await this.ledgerService.getLedgerById(ledgerId);
        const category = await this.categoryService.getCategoryById(categoryId);
        await this.transRepository.update(Id, {
            amount,
            description,
            transDate,
            transType,
            category,
            ledger,
        });
    }
}

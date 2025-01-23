import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { CategoryService } from '../category/category.service';
import { LedgerService } from '../ledger/ledger.service';

describe('TransactionController', () => {
    let controller: TransactionController;

    const mockTransactionRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        save: jest.fn(),
        create: jest.fn(),
        delete: jest.fn(),
    };

    const mockCategoryService = {
        getCategoryById: jest.fn(),
    };

    const mockLedgerService = {
        getLedgerById: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TransactionController],
            providers: [
                TransactionService,
                {
                    provide: getRepositoryToken(Transaction),
                    useValue: mockTransactionRepository,
                },
                {
                    provide: CategoryService,
                    useValue: mockCategoryService,
                },
                {
                    provide: LedgerService,
                    useValue: mockLedgerService,
                },
            ],
        }).compile();

        controller = module.get<TransactionController>(TransactionController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

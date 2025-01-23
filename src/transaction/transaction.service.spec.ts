import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { CategoryService } from '../category/category.service';
import { LedgerService } from '../ledger/ledger.service';

describe('TransactionService', () => {
    let service: TransactionService;

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

        service = module.get<TransactionService>(TransactionService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

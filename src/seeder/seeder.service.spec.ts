import { Test, TestingModule } from '@nestjs/testing';
import { SeederService } from './seeder.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from '../category/category.entity';
import { Ledger } from '../ledger/ledger.entity';
import { User } from '../user/user.entity';

describe('SeederService', () => {
    let service: SeederService;

    const mockCategoryRepository = {
        find: jest.fn(),
        save: jest.fn(),
        create: jest.fn(),
    };

    const mockLedgerRepository = {
        find: jest.fn(),
        save: jest.fn(),
        create: jest.fn(),
    };

    const mockUserRepository = {
        find: jest.fn(),
        save: jest.fn(),
        create: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SeederService,
                {
                    provide: getRepositoryToken(Category),
                    useValue: mockCategoryRepository,
                },
                {
                    provide: getRepositoryToken(Ledger),
                    useValue: mockLedgerRepository,
                },
                {
                    provide: getRepositoryToken(User),
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        service = module.get<SeederService>(SeederService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

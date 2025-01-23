import { Test, TestingModule } from '@nestjs/testing';
import { LedgerService } from './ledger.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ledger } from './ledger.entity';
import { UserService } from 'src/user/user.service';

describe('LedgerService', () => {
    let service: LedgerService;

    const mockLedgerRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        save: jest.fn(),
        create: jest.fn(),
        delete: jest.fn(),
    };

    const mockUserService = {
        getUserById: jest.fn(),
    };
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LedgerService,
                {
                    provide: getRepositoryToken(Ledger),
                    useValue: mockLedgerRepository,
                },
                { provide: UserService, useValue: mockUserService },
            ],
        }).compile();

        service = module.get<LedgerService>(LedgerService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

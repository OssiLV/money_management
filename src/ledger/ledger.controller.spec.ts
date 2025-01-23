import { Test, TestingModule } from '@nestjs/testing';
import { LedgerController } from './ledger.controller';
import { LedgerService } from './ledger.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ledger } from './ledger.entity';
import { UserService } from '../user/user.service';

describe('LedgerController', () => {
    let controller: LedgerController;

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
            controllers: [LedgerController],
            providers: [
                LedgerService,
                {
                    provide: getRepositoryToken(Ledger),
                    useValue: mockLedgerRepository,
                },
                { provide: UserService, useValue: mockUserService },
            ],
        }).compile();

        controller = module.get<LedgerController>(LedgerController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

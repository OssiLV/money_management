import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { UserService } from 'src/user/user.service';

describe('CategoryService', () => {
    let service: CategoryService;
    const mockCategoryRepository = {
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
                CategoryService,
                {
                    provide: getRepositoryToken(Category),
                    useValue: mockCategoryRepository,
                },
                { provide: UserService, useValue: mockUserService },
            ],
        }).compile();

        service = module.get<CategoryService>(CategoryService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

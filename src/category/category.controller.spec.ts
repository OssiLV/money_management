import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { UserService } from '../user/user.service'; // Assuming UserService is needed in CategoryService

describe('CategoryController', () => {
    let controller: CategoryController;

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
            controllers: [CategoryController],
            providers: [
                CategoryService,
                {
                    provide: getRepositoryToken(Category),
                    useValue: mockCategoryRepository,
                },
                {
                    provide: UserService,
                    useValue: mockUserService,
                },
            ],
        }).compile();

        controller = module.get<CategoryController>(CategoryController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

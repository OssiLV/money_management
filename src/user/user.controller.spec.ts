import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { CurrencyType } from 'src/enum';

describe('UserController', () => {
    let controller: UserController;
    let service: UserService;

    // Mock the UserService
    const mockUserService = {
        getAllUsers: jest.fn().mockResolvedValue([
            {
                email: 'test@example.com',
                firstName: 'John',
                lastName: 'Doe',
                balance: 0,
            },
        ]),
        getUserById: jest.fn(),
        createUser: jest.fn().mockResolvedValue({
            email: 'newuser@example.com',
            firstName: 'Jane',
            lastName: 'Doe',
            password: 'password',
            currency: CurrencyType.VND,
            balance: 0,
        }),
        updateUser: jest.fn().mockResolvedValue({
            Id: '905D365F-F82E-4B2F-9282-02DCBD5C87E8',
            email: 'updated@example.com',
            firstName: 'Jane',
            lastName: 'Doe',
            balance: 100,
        }),
        deleteUser: jest
            .fn()
            .mockResolvedValue({ message: 'User successfully deleted' }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: mockUserService,
                },
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getUsers', () => {
        it('should return an array of users', async () => {
            const result = await controller.getUsers();
            expect(result).toEqual([
                {
                    email: 'test@example.com',
                    firstName: 'John',
                    lastName: 'Doe',
                    balance: 0,
                },
            ]);
            expect(service.getAllUsers).toHaveBeenCalled();
        });
    });

    describe('getUserById', () => {
        it('should return a single user by ID', async () => {
            mockUserService.getUserById.mockResolvedValueOnce({
                email: 'test@example.com',
                firstName: 'John',
                lastName: 'Doe',
                balance: 0,
            });

            const result = await controller.getUserById(
                '905D365F-F82E-4B2F-9282-02DCBD5C87E8',
            );
            expect(result).toEqual({
                email: 'test@example.com',
                firstName: 'John',
                lastName: 'Doe',
                balance: 0,
            });
            expect(service.getUserById).toHaveBeenCalledWith(
                '905D365F-F82E-4B2F-9282-02DCBD5C87E8',
            );
        });

        it('should throw a NotFoundException if user not found', async () => {
            mockUserService.getUserById.mockRejectedValueOnce(
                new NotFoundException('User not found'),
            );

            try {
                await controller.getUserById('non-existing-id');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
                expect(error.message).toBe('User not found');
            }
        });
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            const createUserDto: CreateUserDto = {
                email: 'newuser@example.com',
                firstName: 'Jane',
                lastName: 'Doe',
                password: 'password',
                currency: CurrencyType.VND, // Assuming currency is 'VND' based on your enum
            };
            const result = await controller.createUser(createUserDto);
            expect(result).toEqual({
                email: 'newuser@example.com',
                firstName: 'Jane',
                lastName: 'Doe',
                password: 'password',
                currency: CurrencyType.VND,
                balance: 0,
            });
            expect(service.createUser).toHaveBeenCalledWith(createUserDto);
        });
    });

    describe('updateUser', () => {
        it('should update the user info', async () => {
            const updateUserDto: UpdateUserDto = {
                email: 'updated@example.com',
                firstName: 'Jane',
                lastName: 'Doe',
                password: 'newpassword',
                currency: CurrencyType.USD, // Assuming the new currency is 'USD'
            };
            const result = await controller.updateUser(
                '905D365F-F82E-4B2F-9282-02DCBD5C87E8',
                updateUserDto,
            );
            expect(result).toEqual({
                message: 'User info successfully updated',
                Id: '905D365F-F82E-4B2F-9282-02DCBD5C87E8',
            });
            expect(service.updateUser).toHaveBeenCalledWith(
                '905D365F-F82E-4B2F-9282-02DCBD5C87E8',
                updateUserDto,
            );
        });
    });

    describe('delete', () => {
        it('should delete a user', async () => {
            const result = await controller.delete(
                '905D365F-F82E-4B2F-9282-02DCBD5C87E8',
            );
            expect(result).toEqual({ message: 'User successfully deleted' });
            expect(service.deleteUser).toHaveBeenCalledWith(
                '905D365F-F82E-4B2F-9282-02DCBD5C87E8',
            );
        });
    });
});

import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from './dtos';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { email, firstName, lastName, password, currency } =
            createUserDto;
        const user = this.userRepository.create({
            email,
            firstName,
            lastName,
            password,
            currency,
        });
        await this.userRepository.save(user);
        return user;
    }

    async deleteUser(Id: string) {
        const result = await this.userRepository.delete(Id);
        if (result.affected === 0) {
            throw new NotFoundException(`A user "${Id}" was not found`);
        }
        return { message: 'User successfully deleted' };
    }

    async updateUser(Id: string, updateUserDto: UpdateUserDto) {
        const hasUser = await this.getUserById(Id);
        if (!hasUser) throw new Error(`A user "${Id}" was not found`);
        await this.userRepository.update(Id, updateUserDto);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getUserById(Id: string): Promise<User> {
        const found = await this.userRepository.findOne({ where: { Id } });
        if (!found) {
            throw new NotFoundException(`User "${Id}" not found`);
        }
        return found;
    }
}

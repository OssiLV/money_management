import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { email, first_name, last_name, password } = createUserDto;
        const user = this.userRepository.create({
            //user_id: '55ade306-c834-4786-a334-087f40dd2d68',
            email,
            first_name,
            last_name,
            password,
        });
        await this.userRepository.save(user);
        return user;
    }

    async deleteUser(user_id: string) {
        const result = await this.userRepository.delete(user_id);
        if (result.affected === 0) {
            throw new NotFoundException(`A user "${user_id}" was not found`);
        }
        return { message: 'User successfully deleted' };
    }

    async updateUser(user_id: string, updateUserDto: UpdateUserDto) {
        const hasUser = await this.getUserById(user_id);
        if (!hasUser) throw new Error(`A user "${user_id}" was not found`);
        await this.userRepository.update(user_id, updateUserDto);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getUserById(user_id: string): Promise<User> {
        const found = await this.userRepository.findOne({ where: { user_id } });
        if (!found) {
            throw new NotFoundException(`User "${user_id}" not found`);
        }
        return found;
    }
}

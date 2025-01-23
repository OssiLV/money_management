import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { Ledger } from 'src/ledger/ledger.entity';
import { isUUID } from 'src/lib';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Ledger)
        private ledgerRepository: Repository<Ledger>,
    ) {}

    async getUserById(Id: string): Promise<User> {
        if (!isUUID(Id)) {
            throw new BadRequestException('Invalid UUID format for userId');
        }
        const found = await this.userRepository.findOne({
            where: { Id },
            select: {
                Id: true,
                firstName: true,
                lastName: true,
                currency: true,
                email: true,
                balance: true,
            },
        });
        if (!found) {
            throw new NotFoundException(`User "${Id}" not found`);
        }
        return found;
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

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
        const ledger = this.ledgerRepository.create({
            ledgerName: 'Default',
            description: '',
            expenseTotalAmount: 0,
            incomeTotalAmount: 0,
            user,
        });
        await this.ledgerRepository.save(ledger);
        return this.getUserById(user.Id);
    }

    async deleteUser(Id: string) {
        if (!isUUID(Id)) {
            throw new BadRequestException('Invalid UUID format for userId');
        }
        const result = await this.userRepository.delete(Id);
        if (result.affected === 0) {
            throw new NotFoundException(`A user "${Id}" was not found`);
        }
        return { message: 'User successfully deleted' };
    }

    async updateUser(Id: string, updateUserDto: UpdateUserDto) {
        if (!isUUID(Id)) {
            throw new BadRequestException('Invalid UUID format for userId');
        }
        const hasUser = await this.getUserById(Id);
        if (!hasUser) throw new Error(`A user "${Id}" was not found`);
        await this.userRepository.update(Id, updateUserDto);
    }
}

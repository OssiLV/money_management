import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Ledger } from './ledger.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLedgerDto, UpdateLedgerDto } from './dtos';
import { UserService } from 'src/user/user.service';
import { isUUID } from 'src/lib';

@Injectable()
export class LedgerService {
    constructor(
        @InjectRepository(Ledger) private ledgerRepository: Repository<Ledger>,
        private userService: UserService,
    ) {}

    async getLedgerById(Id: string): Promise<Ledger> {
        const found = await this.ledgerRepository.findOne({
            where: { Id },
            relations: { user: true },
            select: {
                user: {
                    Id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                },
            },
        });
        if (!found) {
            throw new NotFoundException(`Ledger "${Id}" not found`);
        }
        return found;
    }

    async createLedger(createLedgerDto: CreateLedgerDto): Promise<Ledger> {
        try {
            const {
                description,
                expenseTotalAmount,
                incomeTotalAmount,
                ledgerName,
                userId,
            } = createLedgerDto;

            const user = await this.userService.getUserById(userId);

            const ledger = this.ledgerRepository.create({
                description,
                expenseTotalAmount,
                incomeTotalAmount,
                ledgerName,
                user,
            });
            await this.ledgerRepository.save(ledger);
            return await this.getLedgerById(ledger.Id);
        } catch (error) {
            if (error.number === 2601 && error.code === 'EREQUEST') {
                // Unique constraint violation error code
                throw new ConflictException(
                    'Ledger name must be unique for this user.',
                );
            }
            throw error;
        }
    }

    async updateLedger(Id: string, updateLedgerDto: UpdateLedgerDto) {
        try {
            const ledger = await this.getLedgerById(Id);
            if (ledger.ledgerName === 'Default') {
                throw new BadRequestException(
                    "You cannot update 'Default' ledger",
                );
            }
            const {
                ledgerName,
                description,
                expenseTotalAmount,
                incomeTotalAmount,
                userId,
            } = updateLedgerDto;
            const user = await this.userService.getUserById(userId);
            await this.ledgerRepository.update(Id, {
                ledgerName,
                description,
                expenseTotalAmount,
                incomeTotalAmount,
                user,
            });
        } catch (error) {
            if (error.number === 2601 && error.code === 'EREQUEST') {
                // Unique constraint violation error code
                throw new ConflictException(
                    'Ledger name must be unique for this user.',
                );
            }
            throw error;
        }
    }
    async getAllLedgers(): Promise<Ledger[]> {
        return await this.ledgerRepository.find({
            relations: { user: true },
            select: { user: { Id: true } },
        });
    }

    async getAllLedgerByUserId(userId: string): Promise<Ledger[]> {
        let ledgers: Ledger[];
        if (userId === undefined) {
            ledgers = await this.getAllLedgers();
            return ledgers;
        }
        if (userId !== undefined) {
            if (userId.trim().length == 0) {
                throw new BadRequestException('Invalid value for userId');
            } else if (
                userId.trim().length > 0 &&
                !isUUID(userId.trim()) &&
                userId.trim().toLocaleLowerCase() !== 'null'
            ) {
                throw new BadRequestException('Invalid UUID format for userId');
            }
        }
        await this.userService.getUserById(userId);

        ledgers = await this.ledgerRepository.find({
            where: { user: { Id: userId } },
            relations: { user: true },
            select: { user: { Id: true } },
        });

        return ledgers;
    }
}

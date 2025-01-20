import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { CreateLedgerDto, UpdateLedgerDto } from './dtos';
import { Ledger } from './ledger.entity';

@Controller('ledgers')
export class LedgerController {
    constructor(private readonly ledgerService: LedgerService) {}

    @Get()
    async getAllLedgersByUserid(
        @Query('userId') userId: string,
    ): Promise<Ledger[]> {
        return await this.ledgerService.getAllLedgerByUserId(userId);
    }

    @Post()
    async createLedger(
        @Body() createLedgerDto: CreateLedgerDto,
    ): Promise<Ledger> {
        return await this.ledgerService.createLedger(createLedgerDto);
    }

    @Put('/:Id')
    async updateLedger(@Param('Id') Id: string, @Body() data: UpdateLedgerDto) {
        await this.ledgerService.updateLedger(Id, data);
        return { message: 'Ledger info successfully updated', Id };
    }
}

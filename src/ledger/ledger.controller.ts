import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { CreateLedgerDto, UpdateLedgerDto } from './dtos';
import { Ledger } from './ledger.entity';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Ledger') // Swagger tag
@Controller('ledgers')
export class LedgerController {
    constructor(private readonly ledgerService: LedgerService) {}

    @ApiQuery({
        name: 'userId',
        type: String,
        required: false, // Makes the query parameter optional in Swagger
        description: 'The ID of the user to filter ledgers',
    })
    @Get()
    async getAllLedgersByUserid(
        @Query('userId') userId: string,
    ): Promise<Ledger[]> {
        return await this.ledgerService.getAllLedgerByUserId(userId);
    }

    @ApiBody({ type: CreateLedgerDto })
    @Post()
    async createLedger(
        @Body() createLedgerDto: CreateLedgerDto,
    ): Promise<Ledger> {
        return await this.ledgerService.createLedger(createLedgerDto);
    }

    @ApiBody({ type: UpdateLedgerDto })
    @Put('/:Id')
    async updateLedger(@Param('Id') Id: string, @Body() data: UpdateLedgerDto) {
        await this.ledgerService.updateLedger(Id, data);
        return { message: 'Ledger info successfully updated', Id };
    }
}

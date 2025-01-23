import { Controller, Post } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Seeder')
@Controller('seeder')
export class SeederController {
    constructor(private seederService: SeederService) {}

    @Post()
    async seed() {
        const result = [];
        result.push(await this.seederService.categorySeed());
        return result;
    }
}

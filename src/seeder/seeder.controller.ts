import { Controller, Get } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Controller('seeder')
export class SeederController {
    constructor(private seederService: SeederService) {}

    @Get()
    async seed() {
        let result = [];
        result.push(await this.seederService.categorySeed());
        return result;
    }
}

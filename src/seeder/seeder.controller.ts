import { Controller, Post } from '@nestjs/common';
import { SeederService } from './seeder.service';

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

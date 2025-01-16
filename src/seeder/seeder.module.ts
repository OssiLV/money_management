import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';
import { SeederController } from './seeder.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [SeederService],
    controllers: [SeederController],
})
export class SeederModule {}

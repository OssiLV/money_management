import { Module } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { LedgerController } from './ledger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ledger } from './ledger.entity';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([Ledger])],
    controllers: [LedgerController],
    providers: [LedgerService],
    exports: [LedgerService],
})
export class LedgerModule {}

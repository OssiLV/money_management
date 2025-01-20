import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Category } from 'src/category/category.entity';
import { Ledger } from 'src/ledger/ledger.entity';
import { Transaction } from 'src/transaction/transaction.entity';
import { User } from 'src/user/user.entity';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT'), 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Category, Transaction, Ledger],
        synchronize: Boolean(configService.get<boolean>('DB_SYNC')), // Auto-sync schema in development (disable in production)
        options: {
            trustServerCertificate: Boolean(
                configService.get<boolean>('DB_TRUST_SERVER_CERTIFICATE'),
            ),
            encrypt: Boolean(configService.get<boolean>('DB_ENCRYPT')), // Enable encryption for Azure SQL or secure connection
        },
    }),
};

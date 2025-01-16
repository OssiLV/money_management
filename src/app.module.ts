import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { SeederService } from './seeder/seeder.service';
import { SeederModule } from './seeder/seeder.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Makes the configuration globally available
            //load: [databaseConfig],
            envFilePath: ['.env.local', '.env'],
        }),
        TypeOrmModule.forRootAsync(typeOrmConfig),
        UserModule,
        CategoryModule,
        TransactionModule,
        SeederModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

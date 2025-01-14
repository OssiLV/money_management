import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Makes the configuration globally available
            //load: [databaseConfig],
            envFilePath: ['.env.local', '.env'],
        }),
        TypeOrmModule.forRootAsync(typeOrmConfig),
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

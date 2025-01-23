import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { CurrencyType } from 'src/enum';

export class UpdateUserDto {
    @ApiProperty({ example: 'example@gmail.com', required: true })
    @IsNotEmpty({ message: 'email field cannot be empty' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123', required: true })
    @IsNotEmpty({ message: 'password field cannot be empty' })
    password: string;

    @ApiProperty({ example: 'John', required: true })
    @IsNotEmpty({ message: 'first_name field cannot be empty' })
    firstName: string;

    @ApiProperty({ example: 'Doe', required: false })
    @IsOptional()
    lastName: string;

    @ApiProperty({
        enum: CurrencyType,
        example: 'VND',
    })
    @IsEnum(CurrencyType)
    currency: CurrencyType;
}

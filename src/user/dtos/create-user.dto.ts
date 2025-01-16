import { IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { CurrencyType } from 'src/enum';

export class CreateUserDto {
    @IsNotEmpty({ message: 'email field cannot be empty' })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'password field cannot be empty' })
    password: string;

    @IsNotEmpty({ message: 'first_name field cannot be empty' })
    firstName: string;

    lastName: string;

    @IsEnum(CurrencyType)
    currency: CurrencyType;
}

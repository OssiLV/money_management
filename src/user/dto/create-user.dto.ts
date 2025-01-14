import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'email field cannot be empty' })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'password field cannot be empty' })
    password: string;

    @IsNotEmpty({ message: 'first_name field cannot be empty' })
    first_name: string;

    last_name: string;
}

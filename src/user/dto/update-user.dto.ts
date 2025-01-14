import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty({ message: 'email field cannot be empty' })
    email: string;

    @IsNotEmpty({ message: 'password field cannot be empty' })
    password: string;

    @IsNotEmpty({ message: 'first_name field cannot be empty' })
    first_name: string;

    last_name: string;
}

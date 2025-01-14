import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // Retrieve all users
    @Get()
    getUsers() {
        return this.userService.getAllUsers();
    }

    // Create a new user
    @Post()
    createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    // Retrieve a user by ID
    @Get('/:user_id')
    getUserById(@Param('user_id') user_id: string): Promise<User> {
        return this.userService.getUserById(user_id);
    }

    // Delete a user by ID
    @Delete('/:user_id')
    delete(@Param('user_id') user_id: string) {
        return this.userService.deleteUser(user_id);
    }

    // Update a user by ID
    @Put('/:user_id')
    async updateNote(
        @Param('user_id') user_id: string,
        @Body() data: UpdateUserDto,
    ) {
        const user = new User();
        Object.assign(user, data);
        await this.userService.updateUser(user_id, user);
        return { message: 'User info successfully updated', user_id };
    }
}

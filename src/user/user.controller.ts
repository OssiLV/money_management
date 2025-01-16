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
import { CreateUserDto, UpdateUserDto } from './dtos';
import { User } from './user.entity';

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
    @Get('/:Id')
    getUserById(@Param('Id') Id: string): Promise<User> {
        return this.userService.getUserById(Id);
    }

    // Delete a user by ID
    @Delete('/:Id')
    delete(@Param('Id') Id: string) {
        return this.userService.deleteUser(Id);
    }

    // Update a user by ID
    @Put('/:Id')
    async updateNote(@Param('Id') Id: string, @Body() data: UpdateUserDto) {
        const user = new User();
        Object.assign(user, data);
        await this.userService.updateUser(Id, user);
        return { message: 'User info successfully updated', Id };
    }
}

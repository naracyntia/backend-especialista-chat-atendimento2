import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './interfaces/user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getAllUsers(): Promise<UserEntity[]> {
        return this.userService.getAllUser();
    }

    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() updateUser: CreateUserDto,
    ): Promise<UserEntity> {
        return this.userService.updateUser(id, updateUser);
    }

    @Get(':id')
    async getUserId(@Param('id') id: string): Promise<UserEntity> {
        return this.userService.getUserId(id);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<{ message: string }> {

        return this.userService.deleteUser(id);
    }
}



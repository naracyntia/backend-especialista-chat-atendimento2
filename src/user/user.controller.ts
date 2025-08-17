import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { DeleteUserDto } from './dtos/deleteUser.dto';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUser();
    }

    @Post()
    async createUser(
        @Body() createUser: CreateUserDto
    ): Promise<User> {
        return this.userService.createUser(createUser);
    }
    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<User> {
        return this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUser(
        @Param('id') id: string,
    ): Promise<User> {
        return await this.userService.deleteUser(id);
    }

}
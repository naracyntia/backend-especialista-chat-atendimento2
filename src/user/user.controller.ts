import { Body, Controller, Get, Param, Post, Put, ParseIntPipe, Delete } from '@nestjs/common';
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

    @Get(`:id`)
    async getUserId(
        @Param('id',) id: string,
    ): Promise<UserEntity> {
        return this.userService.getUserId(id);
    }

    @Post()
    async createUser(
        @Body() createUser: CreateUserDto
    ): Promise<UserEntity> {
        return this.userService.createUser(createUser);
    }

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() updateUser: CreateUserDto
    ): Promise<{ message: string, data: UserEntity }> {
        return this.userService.updateUser(id, updateUser);
    }


    @Delete(`:id`)
    async deleteUser(
        @Param(`id`) id: string,
    ): Promise<{ message: string }> {
        return this.userService.deleteUser(id);
    }

}

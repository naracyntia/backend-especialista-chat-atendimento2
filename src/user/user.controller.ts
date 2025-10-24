<<<<<<< HEAD
import { Body, Controller, Get, Param, Post, Put, ParseIntPipe, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './interface/user.entity';
=======
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './interfaces/user.entity';
>>>>>>> 9b6b0897680d0eeeaf93fdf2605f05b6fba37294

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getAllUsers(): Promise<UserEntity[]> {
        return this.userService.getAllUser();
    }

    @Get(`:id`)
    async getUserId(
        @Param('id',) id: number,
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
<<<<<<< HEAD
        @Param('id') id: number,
=======
        @Param('id') id: string,
>>>>>>> 9b6b0897680d0eeeaf93fdf2605f05b6fba37294
        @Body() updateUser: CreateUserDto
    ): Promise<{ message: string, data: UserEntity }> {
        return this.userService.updateUser(id, updateUser);
    }

<<<<<<< HEAD

    @Delete(`:id`)
    async deleteUser(
        @Param(`id`) id: number,
    ): Promise<{ message: string }> {
        return this.userService.deleteUser(id);
    }

=======
    @Get(':id')
    async getUserId(
        @Param('id') id: string
    ): Promise<UserEntity> {
        return this.userService.getUserId(id);
    }

    @Delete(':id')
    async deleteUser(
        @Param('id') id: string
    ): Promise<{ message: string }> {
        return this.userService.deleteUser(id);
    }
>>>>>>> 9b6b0897680d0eeeaf93fdf2605f05b6fba37294
}



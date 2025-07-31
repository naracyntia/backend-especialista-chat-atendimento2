import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('user')
export class UserController {
    @Get()
    async getAllUsers(){
        return JSON.stringify({ test: 'Chat Atendimento' });
    }

    @Post() 
    async createUser(
        @Body() createUser: CreateUserDto
    ) {
        return createUser;
    }
}

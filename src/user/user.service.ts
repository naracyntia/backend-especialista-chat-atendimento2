import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const saltOrRounds = 10;
        const passwordHash = await hash(createUserDto.password, saltOrRounds);

        return this.userRepository.save({
            ...createUserDto,
            password: passwordHash,
            confirmPassword: undefined,

        })
    }

    async getAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async getUser(id: string): Promise<UserEntity> {
        const userById = await this.userRepository.findOne({ 
            where: { id: Number(id) } });

        if (!userById) {
            throw new HttpException({
                message: `Usuário com o id ${id} não encontrado.`
            },
                HttpStatus.NOT_FOUND,
            );
        }

        return userById;
    }

    async updateUser(id: string, updateUserDto: CreateUserDto): Promise<UserEntity> {
        const saltOrRounds = 10;
        const passwordHash = await hash(updateUserDto.password, saltOrRounds);
        const userUpdate = await this.userRepository.findOne({
            where: { id: Number(id) }
        });

        if (!userUpdate) {
            throw new HttpException({
                message: `Usuário com o id ${id} não encontrado.`
            },
                HttpStatus.NOT_FOUND,
            );
        }

        const updateUser = {
            ...userUpdate,
            ...updateUserDto,
            password: passwordHash,
        }

        return this.userRepository.save(updateUser);
    }

    async deleteUser(id: string): Promise<{ message: string }> {
        const deleteUser = await this.userRepository.findOne({ where: { id: Number(id) } });

        if (!deleteUser) {
            throw new HttpException({
                message: `Usuário com o id ${id} não encontrado.`
            },
                HttpStatus.NOT_FOUND,
            );
        }

        await this.userRepository.remove(deleteUser);

        return { message: `Usuário com id ${id} foi removido com sucesso.` };
    }

}
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
        });
    }

    async getAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async updateUser(id: string, updateUserDto: CreateUserDto): Promise<{ message: string, data: UserEntity }> {
        const saltOrRounds = 10;
        const passwordHash = await hash(updateUserDto.password, saltOrRounds);
        const userUpdate = await this.userRepository.findOne({
            where: { id: Number(id) },
        });

        if (!userUpdate) {
            throw new HttpException(
                { message: `Usuário com o id ${id} não encontrado.` },
                HttpStatus.NOT_FOUND,
            );
        }

        const updateUser = {
            ...userUpdate,
            ...updateUserDto,
            password: passwordHash,
        };

        const savedUser = await this.userRepository.save(updateUser);
 
        return {
            message: "Dados atualizados com sucesso.",
            data: savedUser
        };
    }

    async getUserId(id: string): Promise<UserEntity> {
        const getUserId = await this.userRepository.findOne({
            where: { id: Number(id) },
        });
        if (!getUserId) {
            throw new HttpException(
                { message: `Usuário com o id ${id} não encontrado.` },
                HttpStatus.NOT_FOUND,
            );
        }
        return getUserId;
    }

    async deleteUser(id: string): Promise<{ message: string }> {
        const userDelete = await this.userRepository.findOne({
            where: { id: Number(id) },
        });

        if (!userDelete) {
            throw new HttpException(
                { message: `Usuário com o id ${id} não encontrado.` },
                HttpStatus.NOT_FOUND,
            );
        }

        await this.userRepository.delete({ id: Number(id) });

        return { message: 'Usuário deletado com sucesso.' };
    }
}

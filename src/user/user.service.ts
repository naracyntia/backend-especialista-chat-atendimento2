import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
<<<<<<< HEAD
import { UserEntity } from './interface/user.entity';
=======
import { UserEntity } from './interfaces/user.entity';
>>>>>>> 9b6b0897680d0eeeaf93fdf2605f05b6fba37294
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
<<<<<<< HEAD

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

=======
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

>>>>>>> 9b6b0897680d0eeeaf93fdf2605f05b6fba37294
    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const saltOrRounds = 10;
        const passwordHash = await hash(createUserDto.password, saltOrRounds);

        return this.userRepository.save({
            ...createUserDto,
            password: passwordHash,
            confirmPassword: undefined,
<<<<<<< HEAD

        })
=======
        });
>>>>>>> 9b6b0897680d0eeeaf93fdf2605f05b6fba37294
    }

    async getAllUser(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

<<<<<<< HEAD
    async getUserId(id: number): Promise<UserEntity> {
        const userById = await this.userRepository.findOne({
            where: { id: Number(id) }
        });

        if (!userById) {
            throw new HttpException({
                message: `Usuário com o id ${id} não encontrado.`
            },
                HttpStatus.NOT_FOUND,
            );
        }

        return userById;
    }

    async updateUser(id: number, updateUserDto: CreateUserDto): Promise<{ message: string, data: UserEntity }> {
        const saltOrRounds = 10;
        const passwordHash = await hash(updateUserDto.password, saltOrRounds);
        const userUpdate = await this.userRepository.findOne({
            where: { id: Number(id) }
        });

        if (!userUpdate) {
            throw new HttpException({
                message: `Usuário com o id ${id} não encontrado.`
            },
=======
    async updateUser(id: string, updateUserDto: CreateUserDto): Promise<{ message: string, data: UserEntity }> {
        const saltOrRounds = 10;
        const passwordHash = await hash(updateUserDto.password, saltOrRounds);
        const userUpdate = await this.userRepository.findOne({
            where: { id: Number(id) },
        });

        if (!userUpdate) {
            throw new HttpException(
                { message: `Usuário com o id ${id} não encontrado.` },
>>>>>>> 9b6b0897680d0eeeaf93fdf2605f05b6fba37294
                HttpStatus.NOT_FOUND,
            );
        }

        const updateUser = {
            ...userUpdate,
            ...updateUserDto,
            password: passwordHash,
<<<<<<< HEAD
        }

        const savedUser = await this.userRepository.save(updateUser);

        return {
            message:`Dados atualizados com sucesso.`,
=======
        };

        const savedUser = await this.userRepository.save(updateUser);
 
        return {
            message: `Dados atualizados com sucesso.`,
>>>>>>> 9b6b0897680d0eeeaf93fdf2605f05b6fba37294
            data: savedUser
        };
    }

<<<<<<< HEAD
    async deleteUser(id: number): Promise<{ message: string }> {
        const deleteUser = await this.userRepository.findOne({ where: { id: Number(id) } });

        if (!deleteUser) {
            throw new HttpException({
                message: `Usuário com o id ${id} não encontrado.`
            },
=======
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
>>>>>>> 9b6b0897680d0eeeaf93fdf2605f05b6fba37294
                HttpStatus.NOT_FOUND,
            );
        }

<<<<<<< HEAD
        await this.userRepository.remove(deleteUser);

        return { message: `Usuário deletado com sucesso.` };
    }

}
=======
        await this.userRepository.delete({ id: Number(id) });

        return { message: `Usuário deletado com sucesso.`};
    }

}
>>>>>>> 9b6b0897680d0eeeaf93fdf2605f05b6fba37294

import { Injectable, NotFoundException, } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './interfaces/user.interface';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from './dtos/user.entity';



@Injectable()
export class UserService {
    // In-memory users array for createUser and getAllUser methods
    private users: User[] = [];
    
    constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
    async updateUser(id: string, dto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: { id: Number(id) } });

        if (!user) {
            throw new NotFoundException(`Usuário com id ${id} não encontrado`);
        }

        // Atualiza apenas os campos enviados no body
        Object.assign(user, dto);
        await this.userRepository.save(user);

        return user;
    }


    async deleteUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: Number(id) } });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    await this.userRepository.remove(user);
    
    return user;
  }
 
  
    async createUser (createUserDto: CreateUserDto): Promise<User> {
        const saltOrRounds = 10;
        const passwordHash = await hash(createUserDto.password, saltOrRounds);
        
        const user: User = {
            ...createUserDto,
            id: this.users.length + 1,
            password:passwordHash,
        }
        this.users.push(user)
        return user;    
    }

    async getAllUser () : Promise<User[]> {
        return this.users;
    }
}

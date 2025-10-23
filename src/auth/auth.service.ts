import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/interfaces/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
    ) {}

    async validateUser(mail: string, password: string) {
        const user = await this.userRepo
        .createQueryBuilder('u')
        .addSelect('u.password')
        .where('u.mail = :mail', {mail})
        .getOne();

        if (!user) throw new UnauthorizedException('Invalid Credentials');
        
        const ok = await bcrypt.compare(password, (user as any).password);
         
        if (!ok) throw new UnauthorizedException('Invalid Credentials');

        delete (user as any).password;

        return user;
    }

    async login(mail: string, password: string) {
        const user = await this.validateUser(mail, password);
        const payload = { sub: user.id, email: user.mail };
        const token = await this.jwtService.signAsync(payload);

        return { message: 'Autenticação realizada com sucesso.',
                 user: {
                    id: user.id,
                    name: user.name,
                    surname: user.surname
                },
                 token};
    }
};

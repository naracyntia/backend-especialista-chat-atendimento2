import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/interfaces/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports:[
        ConfigModule, 
        PassportModule,
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory: (cfg: ConfigService) => ({
                secret: cfg.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: cfg.get<string>('JWT_EXPIRES_IN') || '1d' }
            }),
        }),
        TypeOrmModule.forFeature([UserEntity]),
    ],

    providers:[AuthService, JwtStrategy, UserService],
    controllers:[AuthController],
    exports:[AuthService],
})
export class AuthModule {}

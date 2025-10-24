import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from "./user/interface/user.entity";


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      autoLoadEntities: true,
      entities: [`${__dirname}/**/*.entity`],
      migrations: [`${__dirname}/migration/*{.ts,.js}`],
      synchronize: false,
      migrationsRun: true,
    }),
    UserModule,
    UserEntity,
    AuthModule],
  
  controllers: [],
  providers: [],
})
export class AppModule { }




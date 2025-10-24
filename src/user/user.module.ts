import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
import { UserEntity } from './interface/user.entity';
import { UserPreferencesEntity } from './interface/user-preferences.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserPreferencesEntity])],
=======
import { UserEntity } from './interfaces/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature( [UserEntity] )],
>>>>>>> 9b6b0897680d0eeeaf93fdf2605f05b6fba37294
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}

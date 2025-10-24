import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './interface/user.entity';
import { UserPreferencesEntity } from './interface/user-preferences.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserPreferencesEntity])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}

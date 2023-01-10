import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controller/users.controller';
import { User } from './entity/users.entity';
import { UsersProfile } from './entity/usersProfile.entity';
import { UsersRepository } from './respository/users.repository';
import { UsersProfileRepository } from './respository/usersProfile.repository';
import { UsersService } from './service/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UsersProfile])],
  providers: [UsersService, UsersRepository, UsersProfileRepository],
  controllers: [UsersController],
})
export class UsersModule {}

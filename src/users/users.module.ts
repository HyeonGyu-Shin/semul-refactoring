import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controller/users.controller';
import { User } from './entity/users.entity';
import { UsersRepository } from './respository/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}

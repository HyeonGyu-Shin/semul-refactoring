import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/users.entity';

@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async create(user: User) {
    return await this.usersRepository.save(user);
  }

  async findOneById(loginId: string) {
    return await this.usersRepository
      .createQueryBuilder('User')
      .where('User.loginId = :id', { id: loginId })
      .getOne();
  }
}

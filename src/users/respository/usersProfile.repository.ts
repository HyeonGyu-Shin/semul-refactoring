import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { UsersProfile } from '../entity/usersProfile.entity';

@Injectable()
export class UsersProfileRepository {
  constructor(
    @InjectRepository(UsersProfile) private usersProfileRepository: Repository<UsersProfile>
  ) {}

  async create(userProfile: UsersProfile) {
    return await this.usersProfileRepository.save(userProfile);
  }

  async createByEm(user, manager: EntityManager) {
    return;
  }
}

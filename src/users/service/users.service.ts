import { BadRequestException, Injectable } from '@nestjs/common';
import { StatusCodeEnum, StatusEnum } from '../../common/swagger/message.response.dto';
import { DataSource } from 'typeorm';
import { SignUpReqDto } from '../dto/signUp.request.dto';
import { SignUpResDto } from '../dto/signUp.response.dto';
import { UsersRepository } from '../respository/users.repository';
import { UsersProfileRepository } from '../respository/usersProfile.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersProfileRepository: UsersProfileRepository // private dataSoucre: DataSource
  ) {}

  // async createQueryRunner() {
  //   const queryRunner = await this.dataSoucre.createQueryRunner();
  //   await queryRunner.connect();
  //   const manager = queryRunner.manager;
  //   return { queryRunner, manager };
  // }

  // async signUp(signUpReqDto: sign) {
  // const { queryRunner, manager } = await this.createQueryRunner();
  //   try {
  //     await this.usersRepository.createByEm(user, manager);
  //     await this.usersProfileRepository.createByEm(user, manager);
  //   } catch (err) {
  //     return err;
  //   }

  async signUp(signUpReqDto: SignUpReqDto) {
    const { loginId, password } = signUpReqDto;

    if (await this.usersRepository.findOneById(loginId)) {
      throw new BadRequestException('중복된 Id입니다.');
    }

    const user = signUpReqDto.toUserInstance();
    const userProfile = signUpReqDto.toUserProfileInstance();

    user.password = await this.hashPassword(password);
    userProfile.user = user;

    await this.usersProfileRepository.create(userProfile);

    return new SignUpResDto('Succese signUp', StatusCodeEnum.OK, StatusEnum.OK);
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  // async findOneUser(email: string) {
  //   return this.usersRepository.findOne(email);
  // }
}

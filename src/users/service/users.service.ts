import { BadRequestException, Injectable } from '@nestjs/common';
import { StatusCodeEnum, StatusEnum } from 'src/common/swagger/message.response.dto';
import { DataSource } from 'typeorm';
import { SignUpReqDto } from '../dto/signUp.request.dto';
import { SignUpResDto } from '../dto/signUp.response.dto';
import { User } from '../entity/users.entity';
import { UsersProfile } from '../entity/usersProfile.entity';
import { UsersRepository } from '../respository/users.repository';
import { UsersProfileRepository } from '../respository/usersProfile.repository';

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
  //     return err;ㄷ
  //   }

  async signUp(signUpReqDto: SignUpReqDto) {
    const { loginId } = signUpReqDto;

    if (await this.usersRepository.findOneById(loginId)) {
      throw new BadRequestException('중복된 Id입니다.');
    }

    const user = new User();
    user.loginId = signUpReqDto.loginId;
    user.password = signUpReqDto.password;

    const userProfile = new UsersProfile();
    userProfile.user = user;
    userProfile.phoneNumber = signUpReqDto.phoneNumber;
    userProfile.address = signUpReqDto.address;
    userProfile.userTypeCode = signUpReqDto.userTypeCode;

    await this.usersProfileRepository.create(userProfile);

    return new SignUpResDto('Succese signUp', StatusCodeEnum.OK, StatusEnum.OK);
  }

  // async findOneUser(email: string) {
  //   return this.usersRepository.findOne(email);
  // }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { StatusCodeEnum, StatusEnum } from '../../common/swagger/message.response.dto';
import { SignUpReqDto } from '../dto/signUp.request.dto';
import { SignUpResDto } from '../dto/signUp.response.dto';
import { UsersRepository } from '../respository/users.repository';
import { UsersProfileRepository } from '../respository/usersProfile.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersProfileRepository: UsersProfileRepository
  ) {}

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

  async login({ loginId, password }) {
    const foundUser = await this.usersRepository.findOneById(loginId);

    if (!foundUser) throw new NotFoundException('아이디 또는 비밀번호를 확인해주세요.');
    if (!(await this.comparePassword(password, foundUser.password)))
      throw new UnauthorizedException('아이디 또는 비밀번호를 확인해주세요.');

    return foundUser;
  }

  // async findOneUser(email: string) {
  //   return this.usersRepository.findOne(email);
  // }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePassword(password, passwordInDb) {
    return (await bcrypt.compare(password, passwordInDb)) ? true : false;
  }
}

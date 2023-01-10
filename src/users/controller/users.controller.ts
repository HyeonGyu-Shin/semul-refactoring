import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignUpReqDto } from '../dto/signUpReq.dto';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signUp')
  signUp(@Body() signUpReqDto: SignUpReqDto) {
    return this.usersService.signUp(signUpReqDto);
  }
}

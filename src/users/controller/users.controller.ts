import { Body, Controller, Post } from '@nestjs/common';
import { SignUpReqDto } from '../dto/signUp.request.dto';
import { UsersService } from '../service/users.service';
import { ApiTags, ApiOperation, ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { BadRequestResponse } from 'src/common/swagger/message.response.dto';
import { SignUpResDto } from '../dto/signUp.response.dto';

@ApiTags('일반 유저 API')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: '회원가입 API' })
  @ApiBadRequestResponse({
    type: BadRequestResponse,
  })
  @ApiOkResponse({
    type: SignUpResDto,
  })
  @Post('signup')
  signUp(@Body() signUpReqDto: SignUpReqDto) {
    return this.usersService.signUp(signUpReqDto);
  }

  @Post('login')
  login(@Body() body: { loginId: string; password: string }) {
    return this.usersService.login(body);
  }
}

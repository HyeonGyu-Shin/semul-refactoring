import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entity/users.entity';
import { UsersProfile } from '../entity/usersProfile.entity';

export class SignUpReqDto {
  @ApiProperty({
    example: 'user1',
    description: 'user의 Id입니다.',
  })
  @IsString()
  loginId: string;

  @ApiProperty({
    example: '1234',
    description: 'user의 Pw입니다.',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: '010-1234-1234',
    description: 'user의 전화번호입니다.',
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    example: '전라북도 익산시 익산대로 384 대학원룸 105호',
    description: 'user의 주소입니다.',
  })
  @IsString()
  address: string;

  @ApiProperty({
    example: '01',
    description: 'user의 구분코드입니다. 추후 수정 예정',
  })
  @IsString()
  userTypeCode: string;

  toUserInstance() {
    return User.createInstance({ loginId: this.loginId, password: this.password });
  }

  toUserProfileInstance() {
    return UsersProfile.createInstance({
      phoneNumber: this.phoneNumber,
      address: this.address,
      userTypeCode: this.userTypeCode,
    });
  }
}

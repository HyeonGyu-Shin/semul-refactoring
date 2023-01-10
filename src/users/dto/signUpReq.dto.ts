import { IsString } from 'class-validator';

export class SignUpReqDto {
  @IsString()
  loginId: string;

  @IsString()
  password: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  address: string;

  @IsString()
  userTypeCode: string;
}

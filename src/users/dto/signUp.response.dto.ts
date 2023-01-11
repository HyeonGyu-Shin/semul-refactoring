import {
  MessageResponseCore,
  StatusCodeEnum,
  StatusEnum,
} from '../../common/swagger/message.response.dto';
import { ApiResponseProperty } from '@nestjs/swagger';

export class SignUpResDto implements MessageResponseCore {
  @ApiResponseProperty({ example: 'Succese signUp' })
  message: string;

  @ApiResponseProperty({ example: '200' })
  statusCode: StatusCodeEnum;

  @ApiResponseProperty({ example: 'Ok' })
  status: StatusEnum;

  constructor(message: string, statusCode: StatusCodeEnum, status: StatusEnum) {
    this.message = message;
    this.statusCode = statusCode;
    this.status = status;
  }
}

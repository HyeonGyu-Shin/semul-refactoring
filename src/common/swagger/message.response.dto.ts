import { ApiResponseProperty } from '@nestjs/swagger';

export interface MessageResponseCore {
  message: string;
  statusCode: number;
  status: StatusEnum;
}

export enum StatusEnum {
  OK = 'Ok',
  NOT_FOUND = 'Not Found',
  BAD_REQUEST = 'Bad Rqeust',
  FORBIDDEN = 'Forbidden',
  UNAUTHORIZED = 'Unauthorized',
  REQUEST_TIMEOUT = 'Request Timeout',
  METHOD_NOT_ALLOWED = 'Method Not Allowed',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  NOT_IMPLEMENTED = 'Not Implemented',
}

export enum StatusCodeEnum {
  OK = 200,
  NOT_FOUND = 404,
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  UNAUTHORIZED = 401,
  REQUEST_TIMEOUT = 408,
  METHOD_NOT_ALLOWED = 405,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
}

export class OkResponse implements MessageResponseCore {
  @ApiResponseProperty({ example: 'Succese /*Did Something*/' })
  message: string;

  @ApiResponseProperty({ example: StatusCodeEnum.OK })
  statusCode: StatusCodeEnum.OK;

  @ApiResponseProperty({ example: StatusEnum.OK })
  status: StatusEnum.OK;

  constructor(message: string, statusCode: number, status: StatusEnum.OK) {
    this.message = message;
    this.statusCode = statusCode;
    this.status = status;
  }
}

export class NotFoundResponse implements MessageResponseCore {
  @ApiResponseProperty({ example: 'Does Not Exsists' })
  message: 'Does Not Exsists';

  @ApiResponseProperty({ example: StatusCodeEnum.NOT_FOUND })
  statusCode: StatusCodeEnum.NOT_FOUND;

  @ApiResponseProperty({ example: StatusEnum.NOT_FOUND })
  status: StatusEnum.NOT_FOUND;
}

export class UnauthorizedResponse implements MessageResponseCore {
  @ApiResponseProperty({ example: 'Need Get Authorization' })
  message: 'Need Get Authorization';

  @ApiResponseProperty({ example: StatusCodeEnum.UNAUTHORIZED })
  statusCode: StatusCodeEnum.UNAUTHORIZED;

  @ApiResponseProperty({ example: StatusEnum.UNAUTHORIZED })
  status: StatusEnum.UNAUTHORIZED;
}

export class NotImplementedResponse implements MessageResponseCore {
  @ApiResponseProperty({ example: 'Not Support Token Format' })
  message: 'Not Support Token Format';

  @ApiResponseProperty({ example: StatusCodeEnum.NOT_IMPLEMENTED })
  statusCode: StatusCodeEnum.NOT_IMPLEMENTED;

  @ApiResponseProperty({ example: StatusEnum.NOT_IMPLEMENTED })
  status: StatusEnum.NOT_IMPLEMENTED;
}

export class BadRequestResponse implements MessageResponseCore {
  @ApiResponseProperty({ example: 'Incorrect Request' })
  message: 'Incorrect Request';

  @ApiResponseProperty({ example: StatusCodeEnum.BAD_REQUEST })
  statusCode: StatusCodeEnum.BAD_REQUEST;

  @ApiResponseProperty({ example: StatusEnum.BAD_REQUEST })
  status: StatusEnum.BAD_REQUEST;
}

export class ForbiddenResponse implements MessageResponseCore {
  @ApiResponseProperty({ example: 'Not Have Authority Use This API' })
  message: 'Not Have Authority Use This API';

  @ApiResponseProperty({ example: StatusCodeEnum.FORBIDDEN })
  statusCode: StatusCodeEnum.FORBIDDEN;

  @ApiResponseProperty({ example: StatusEnum.FORBIDDEN })
  status: StatusEnum.FORBIDDEN;
}

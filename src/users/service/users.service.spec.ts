import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from '../respository/users.repository';
import { Repository } from 'typeorm';
import { UsersProfileRepository } from '../respository/usersProfile.repository';
import { NotFoundException } from '@nestjs/common';

const MockUserRepository = () => ({
  createQueryBuilder: jest.fn().mockReturnValue({
    innerJoin: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    getRawMany: jest.fn().mockReturnThis(),
  }),
  create: jest.fn(),
  findOneById: jest.fn(),
});

const MockUserProfileRepository = () => ({
  create: jest.fn(),
});

type MockRepository<T> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: MockRepository<typeof MockUserRepository>;
  let usersProfileRepository: MockRepository<typeof MockUserProfileRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: MockUserRepository(),
        },
        {
          provide: UsersProfileRepository,
          useValue: MockUserProfileRepository(),
        },
      ],
    }).compile();

    usersService = module.get(UsersService);
    usersRepository = module.get<MockRepository<typeof MockUserRepository>>(UsersRepository);
    usersProfileRepository =
      module.get<MockRepository<typeof MockUserProfileRepository>>(UsersProfileRepository);
  });

  describe('signUp() 테스트', () => {
    describe('signUp()가 실행되었다.', () => {
      const signUpReqDto = {
        loginId: 'rkrkdldkd',
        password: '1234',
        phoneNumber: '010-1234-1234',
        address: '익산대로 384 대학원룸 105호',
        userTypeCode: '01',
      };

      beforeEach(async () => {
        usersRepository.findOneById.mockResolvedValue(undefined);
      });

      it('signUp() 매개변수가 signUpReqDto로 잘 들어왔는지 테스트', async () => {
        const signUpSpy = jest.spyOn(usersService, 'signUp');
        await usersService.signUp(signUpReqDto);

        expect(signUpSpy).toHaveBeenCalledWith(signUpReqDto);
      });

      it('signUp()을 호출했을 때 이미 DB에 있는 Id로 가입을 한다면 에러처리', async () => {
        usersRepository.findOneById.mockResolvedValue({});

        try {
          await usersService.signUp(signUpReqDto);
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toBe('중복된 Id입니다.');
        }
      });

      it('signUp() 호출시 userProfileRepo.create()를 1번 호출하고, 필요한 매개변수가 잘 넘어가는지 테스트', async () => {
        await usersService.signUp(signUpReqDto);

        expect(usersProfileRepository.create).toHaveBeenCalledWith({
          phoneNumber: '010-1234-1234',
          address: '익산대로 384 대학원룸 105호',
          userTypeCode: '01',
          user: {
            loginId: 'rkrkdldkd',
            password: '1234',
          },
        });

        expect(usersProfileRepository.create).toHaveBeenCalledTimes(1);
      });
    });
  });
});

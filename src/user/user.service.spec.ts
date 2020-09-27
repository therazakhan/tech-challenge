import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

describe('User Controller', () => {
  let testingModule: TestingModule;
  let controller: UserController;
  let spyService: UserService;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useFactory: () => ({
            getUsers: jest.fn(() => [
              {
                id: '12121212',
                name: 'test',
                usernmae: 'aadsda',
                email: 'abc@abc.com',
                address: {},
                phone: '1234567890',
                website: 'http://test.com',
                company: {},
              },
            ]),
          }),
        },
      ],
    }).compile();
    controller = testingModule.get(UserController);
    spyService = testingModule.get(UserService);
  });
  describe('getUser', () => {
    it('should return users', async () => {
      controller.getUsers();
      expect(spyService.getUsers()).toEqual([
        {
          id: '12121212',
          name: 'test',
          usernmae: 'aadsda',
          email: 'abc@abc.com',
          address: {},
          phone: '1234567890',
          website: 'http://test.com',
          company: {},
        },
      ]);
    });
  });
});

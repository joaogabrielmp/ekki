import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUser from './CreateUser';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUser;

fdescribe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUser(fakeUsersRepository);
  });

  it('should be able to find user by id', async () => {
    const account_id = '1437216b-57ea-4dec-a1aa-12448c897e3b';

    const user = await createUser.execute({
      account_id,
      cellphone: '99877665544',
      cpf: '03957547040',
      name: '',
    });

    expect(user.account_id).toBe('1437216b-57ea-4dec-a1aa-12448c897e3b');
  });

  // it('should not be able to create a new beneficiary when already registered', async () => {
  //   const beneficiary_id = 'ae0f86f5-4011-413d-83c6-3332b6c488d2';
  //   const user_id = '8974b5c3-ad20-48a6-9665-a8f56f4ea8c0';

  //   await createUserBeneficiary.execute({
  //     beneficiary_id,
  //     user_id,
  //   });

  //   await expect(
  //     createUserBeneficiary.execute({
  //       beneficiary_id: 'ae0f86f5-4011-413d-83c6-3332b6c488d2',
  //       user_id: '8974b5c3-ad20-48a6-9665-a8f56f4ea8c0',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});

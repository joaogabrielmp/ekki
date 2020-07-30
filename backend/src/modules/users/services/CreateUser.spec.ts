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
    const user = await createUser.execute({
      cellphone: '99877665544',
      cpf: '03957547040',
      name: '',
    });

    expect(user.cpf).toBe('03957547040');
  });

  it('should not be able to create a new user when already registered', async () => {
    await createUser.execute({
      cellphone: '99877665544',
      cpf: '03957547040',
      name: '',
    });

    await expect(
      createUser.execute({
        cellphone: '99877665544',
        cpf: '03957547040',
        name: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

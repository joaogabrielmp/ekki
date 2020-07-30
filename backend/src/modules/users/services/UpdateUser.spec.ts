import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateUser from './UpdateUser';

let fakeUsersRepository: FakeUsersRepository;
let updateUser: UpdateUser;

fdescribe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    updateUser = new UpdateUser(fakeUsersRepository);
  });

  it('should be able to update user by id', async () => {
    const user = await fakeUsersRepository.create({
      cellphone: '99877665544',
      cpf: '03957547040',
      name: 'John Doe',
    });

    const updatedUser = await updateUser.execute({
      cellphone: '99811112222',
      cpf: '12345678901',
      name: 'Jane Doe',
      user_id: user.id,
    });

    expect(updatedUser.cellphone).toBe('99811112222');
    expect(updatedUser.cpf).toBe('12345678901');
    expect(updatedUser.name).toBe('Jane Doe');
  });

  it('should not be able to update from non-existing user', async () => {
    await expect(
      updateUser.execute({
        cellphone: '99811112222',
        cpf: '12345678901',
        name: 'Jane Doe',
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user with an existing cpf', async () => {
    const user = await fakeUsersRepository.create({
      cellphone: '99877665544',
      cpf: '03957547040',
      name: 'John Doe',
    });

    await expect(
      updateUser.execute({
        cellphone: '99811112222',
        cpf: '03957547040',
        name: 'Jane Doe',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

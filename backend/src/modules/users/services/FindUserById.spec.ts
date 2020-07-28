import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FindUserById from './FindUserById';

let fakeUsersRepository: FakeUsersRepository;
let findUserById: FindUserById;

describe('FindById', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    findUserById = new FindUserById(fakeUsersRepository);
  });

  it('should be able to find user by id', async () => {
    const user_id = 'cf41da34-a7c3-4c68-b79f-a42740aaec04';
    const user = await findUserById.execute({ user_id });

    expect(user.name).toBe('John Doe');
    expect(user.cpf).toBe('43271533032');
    expect(user.cellphone).toBe('37991918282');
  });

  it('should not be able to find user by incorrect id', async () => {
    await expect(
      findUserById.execute({ user_id: 'non-existing-user-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    if (id !== 'non-existing-user-id') {
      const user = new User();

      Object.assign(user, {
        id,
        name: 'John Doe',
        cpf: '43271533032',
        cellphone: '37991918282',
      });

      this.users.push(user);
    }

    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }
}

export default FakeUsersRepository;

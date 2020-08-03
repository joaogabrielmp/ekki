import IUserDTO from '@modules/users/dtos/IUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create({
    cellphone,
    cpf,
    name,
    user_id,
  }: IUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: 'a756ea69-5103-463f-8946-84e00e8e66e4',
      cellphone,
      cpf,
      name,
    });

    this.users.push(user);

    return user;
  }

  public async findByCPF(cpf: string): Promise<User | undefined> {
    if (cpf !== 'non-existing-cpf') {
      const user = new User();

      Object.assign(user, {
        id: 'a756ea69-5103-463f-8946-84e00e8e66e4',
        name: 'John Doe',
        cpf: '43271533032',
        cellphone: '37991918282',
      });

      this.users.push(user);
    }

    const findUser = this.users.find(user => user.cpf === cpf);

    return findUser;
  }

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

  public async update(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;

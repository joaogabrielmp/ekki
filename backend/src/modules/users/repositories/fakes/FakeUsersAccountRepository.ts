import IUsersAccountRepository from '@modules/users/repositories/IUsersAccountRepository';

import UserAccount from '@modules/users/entities/UserAccount';

class FakeUsersAccountRepository implements IUsersAccountRepository {
  private usersAccount: UserAccount[] = [];

  public async findById(id: string): Promise<UserAccount | undefined> {
    if (id !== 'non-existing-user-id') {
      const userAccount = new UserAccount();

      Object.assign(userAccount, {
        id,
        name: 'John Doe',
        cpf: '43271533032',
        cellphone: '37991918282',
      });

      this.usersAccount.push(userAccount);
    }

    const findUserAccount = this.usersAccount.find(
      userAccount => userAccount.id === id,
    );

    return findUserAccount;
  }
}

export default FakeUsersAccountRepository;

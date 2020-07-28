import { getRepository, Repository } from 'typeorm';

import IUsersAccountRepository from '@modules/users/repositories/IUsersAccountRepository';

import UserAccount from '@modules/users/entities/UserAccount';

class UsersAccountRepository implements IUsersAccountRepository {
  private ormRepository: Repository<UserAccount>;

  constructor() {
    this.ormRepository = getRepository(UserAccount);
  }

  public async findById(id: string): Promise<UserAccount | undefined> {
    const userAccount = await this.ormRepository.findOne(
      { user_id: id },
      {
        relations: ['user'],
      },
    );

    return userAccount;
  }
}

export default UsersAccountRepository;

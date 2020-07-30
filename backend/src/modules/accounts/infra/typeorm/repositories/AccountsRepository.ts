import { getRepository, Repository } from 'typeorm';

import IAccountDTO from '@modules/accounts/dtos/IAccountDTO';
import IAccountRepository from '@modules/accounts/repositories/IAccountsRepository';

import Account from '@modules/accounts/entities/Account';

class AccountsRepository implements IAccountRepository {
  private ormRepository: Repository<Account>;

  constructor() {
    this.ormRepository = getRepository(Account);
  }

  public async create(data: IAccountDTO): Promise<Account> {
    const account = this.ormRepository.create(data);

    await this.ormRepository.save(account);

    return account;
  }

  public async findByAccountNumber(
    account_number: string,
  ): Promise<Account | undefined> {
    const account = await this.ormRepository.findOne({ account_number });

    return account;
  }
}

export default AccountsRepository;

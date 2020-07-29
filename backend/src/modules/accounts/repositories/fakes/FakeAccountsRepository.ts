import IAccountRepository from '@modules/accounts/repositories/IAccountRepository';

import Account from '@modules/accounts/entities/Account';

class FakeAccountsRepository implements IAccountRepository {
  private accounts: Account[] = [];

  public async create(): Promise<Account> {
    const account = new Account();

    Object.assign(account, {
      id: '1b0f8ccc-0586-4a78-9891-440d84376cea',
      account_number: '1234561',
      balance: 0,
    });

    this.accounts.push(account);

    return account;
  }

  public async findByAccountNumber(
    account_number: string,
  ): Promise<Account | undefined> {
    const findAccount = this.accounts.find(
      account => account.account_number === account_number,
    );

    return findAccount;
  }
}

export default FakeAccountsRepository;

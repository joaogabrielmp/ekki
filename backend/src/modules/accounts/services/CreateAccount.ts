import { inject, injectable } from 'tsyringe';

import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';

import Account from '@modules/accounts/entities/Account';

@injectable()
class CreateAccount {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {}

  public async execute(): Promise<Account> {
    const account_number = await this.generateAccountNumber();

    const account = await this.accountsRepository.create({
      account_number,
      balance: 0,
    });

    return account;
  }

  private async generateAccountNumber(): Promise<string> {
    const minimum = 1000000;
    const maximum = 9999999;
    const account_number = (
      Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
    ).toString();

    const hasAccountNumber = await this.accountsRepository.findByAccountNumber(
      account_number,
    );

    if (hasAccountNumber) {
      await this.generateAccountNumber();
    }

    return account_number;
  }
}

export default CreateAccount;

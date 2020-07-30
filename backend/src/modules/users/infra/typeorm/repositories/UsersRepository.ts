import { getManager, getRepository, Repository } from 'typeorm';

import IUserDTO from '@modules/users/dtos/IUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import Account from '@modules/accounts/entities/Account';
import User from '@modules/users/entities/User';

class UsersRepository implements IUsersRepository {
  private ormUserRepository: Repository<User>;

  private ormAccountRepository: Repository<Account>;

  constructor() {
    this.ormUserRepository = getRepository(User);
    this.ormAccountRepository = getRepository(Account);
  }

  public async create({ cellphone, cpf, name }: IUserDTO): Promise<User> {
    const account_number = await this.generateAccountNumber();

    const account = this.ormAccountRepository.create({
      account_number,
      balance: 0,
    });

    const user = this.ormUserRepository.create({ cellphone, cpf, name });

    await getManager().transaction(async () => {
      await this.ormAccountRepository.save(account);
      await this.ormUserRepository.save({
        ...user,
        account_id: account.id,
      });
    });

    return user;
  }

  public async findByCPF(cpf: string): Promise<User | undefined> {
    const user = await this.ormUserRepository.findOne({ cpf });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormUserRepository.findOne(id);

    return user;
  }

  private async findByAccountNumber(
    account_number: string,
  ): Promise<Account | undefined> {
    const account = await this.ormAccountRepository.findOne({ account_number });

    return account;
  }

  public async update(user: User): Promise<User> {
    return this.ormUserRepository.save(user);
  }

  private async generateAccountNumber(): Promise<string> {
    const minimum = 1000000;
    const maximum = 9999999;
    const account_number = (
      Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
    ).toString();

    const hasAccountNumber = await this.findByAccountNumber(account_number);

    if (hasAccountNumber) {
      await this.generateAccountNumber();
    }

    return account_number;
  }
}

export default UsersRepository;

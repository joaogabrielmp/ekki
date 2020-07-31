import { getConnection, getRepository, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

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

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    const uuid = uuidv4();

    const account = queryRunner.manager.getRepository(Account).create({
      id: uuid,
      account_number,
      balance: 0,
      limit: 500,
    });

    const user = queryRunner.manager.getRepository(User).create({
      account_id: uuid,
      cellphone,
      cpf,
      name,
    });

    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(account);
      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

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

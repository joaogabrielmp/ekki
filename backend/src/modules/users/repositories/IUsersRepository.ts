import IUserDTO from '@modules/users/dtos/IUserDTO';
import Account from '@modules/accounts/entities/Account';
import User from '@modules/users/entities/User';

export default interface IUsersRepository {
  create(data: IUserDTO): Promise<User>;
  findByAccountNumber(account_number: string): Promise<Account | undefined>;
  findByCPF(cpf: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  generateAccountNumber(account_number: string): Promise<string>;
  // update(data?: IUserDTO): Promise<void>;
}

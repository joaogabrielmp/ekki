import IUserDTO from '@modules/users/dtos/IUserDTO';
import Account from '@modules/accounts/entities/Account';
import User from '@modules/users/entities/User';

export default interface IUsersRepository {
  create(data: IUserDTO): Promise<User>;
  createAccount(): Promise<Account>;
  findByCPF(cpf: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  // update(data?: IUserDTO): Promise<void>;
}

import IAccountDTO from '@modules/accounts/dtos/IAccountDTO';
import Account from '@modules/accounts/entities/Account';

export default interface IAccountRepository {
  create(data: IAccountDTO): Promise<Account>;
  findByAccountNumber(account_number: string): Promise<Account | undefined>;
}

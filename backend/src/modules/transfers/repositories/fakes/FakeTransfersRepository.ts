import ICancelTransferDTO from '@modules/transfers/dtos/ICancelTransferDTO';
import IFindAllTransfersDTO from '@modules/transfers/dtos/IFindAllTransfersDTO';
import IFindTransferDTO from '@modules/transfers/dtos/IFindTransferDTO';
import IProcessTransferDTO from '@modules/transfers/dtos/IProcessTransferDTO';
import ITransfersRepository from '@modules/transfers/repositories/ITransfersRepository';

import Account from '@modules/accounts/entities/Account';
import Transfer from '@modules/transfers/entities/Transfer';

class FakeTransfersRepository implements ITransfersRepository {
  private accounts: Account[] = [];

  private transfers: Transfer[] = [];

  public async cancelTransfer({
    status,
    transfer_id,
  }: ICancelTransferDTO): Promise<Transfer> {
    const createTransfer = new Transfer();

    Object.assign(createTransfer, {
      status,
      transfer_id,
    });

    this.transfers.push(createTransfer);

    this.transfers = this.transfers.filter(transfer => {
      return transfer.id !== transfer_id;
    });

    return createTransfer;
  }

  public async findAccount(
    account_number: string,
  ): Promise<Account | undefined> {
    if (account_number !== 'non-existing-account-number') {
      const account = new Account();

      Object.assign(account, {
        account_number,
        balance: 1000,
        limit: 500,
      });

      this.accounts.push(account);
    }

    const findAccount = this.accounts.find(
      account => account.account_number === account_number,
    );

    return findAccount;
  }

  public async findAllAndCountById(user_id: string): Promise<number> {
    const total = this.transfers.length;

    return total;
  }

  public async findAllById({
    page,
    per_page,
    user_id,
  }: IFindAllTransfersDTO): Promise<Transfer[]> {
    let { transfers } = this;

    transfers = this.transfers
      .slice(page - 1, per_page)
      .filter(transfer => transfer.send_user_id === user_id);

    return transfers;
  }

  public async findTransfer({
    receive_user_id,
    send_user_id,
    status,
    value,
  }: IFindTransferDTO): Promise<Transfer | undefined> {
    if (receive_user_id !== 'non-existing-receive-user-id') {
      const transfer = new Transfer();

      Object.assign(transfer, {
        receive_user_id,
        send_user_id,
        status,
        value,
        updated_at: new Date(),
      });

      this.transfers.push(transfer);
    }

    const findTransfer = this.transfers.find(
      transfer => transfer.receive_user_id === receive_user_id,
    );

    return findTransfer;
  }

  public async processTransfer({
    debitAccount,
    debitLimit,
    receive_account_number,
    receive_user_id,
    send_account_number,
    send_user_id,
    status,
    value,
  }: IProcessTransferDTO): Promise<Transfer> {
    const transfer = new Transfer();

    Object.assign(transfer, {
      id: 'a756ea69-5103-463f-8946-84e00e8e66e4',
      balance: value,
      receive_user_id,
      send_user_id,
      status,
      value,
    });

    this.transfers.push(transfer);

    if (debitAccount) {
      if (debitLimit) {
        // do something
      } else {
        // do something
      }
    }

    return transfer;
  }
}

export default FakeTransfersRepository;

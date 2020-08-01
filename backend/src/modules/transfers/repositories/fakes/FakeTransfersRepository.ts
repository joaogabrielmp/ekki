import ICancelTransferDTO from '@modules/transfers/dtos/ICancelTransferDTO';
import IFindTransferDTO from '@modules/transfers/dtos/IFindTransferDTO';
import ITransferDTO from '@modules/transfers/dtos/ITransferDTO';
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
    debitAcccount,
    debitLimit,
    receive_account_number,
    receive_user_id,
    send_account_number,
    send_user_id,
    status,
    value,
  }: ITransferDTO): Promise<Transfer> {
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

    if (debitAcccount) {
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

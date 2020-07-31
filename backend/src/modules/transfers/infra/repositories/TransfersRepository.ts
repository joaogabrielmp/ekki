import { getConnection, getRepository, Repository } from 'typeorm';

import ICancelTransferDTO from '@modules/transfers/dtos/ICancelTransferDTO';
import IFindTransferDTO from '@modules/transfers/dtos/IFindTransferDTO';
import ITransferDTO from '@modules/transfers/dtos/ITransferDTO';
import ITransfersRepository from '@modules/transfers/repositories/ITransfersRepository';

import Account from '@modules/accounts/entities/Account';
import Transfer from '@modules/transfers/entities/Transfer';

class TransfersRepository implements ITransfersRepository {
  private ormAccountRepository: Repository<Account>;

  private ormTransferRepository: Repository<Transfer>;

  constructor() {
    this.ormAccountRepository = getRepository(Account);
    this.ormTransferRepository = getRepository(Transfer);
  }

  public async cancelTransfer({
    status,
    transfer_id,
  }: ICancelTransferDTO): Promise<Transfer> {
    const transfer = await this.ormTransferRepository.save({
      status,
      id: transfer_id,
    });

    return transfer;
  }

  public async findAccount(
    account_number: string,
  ): Promise<Account | undefined> {
    const transfer = await this.ormAccountRepository.findOne({
      account_number,
    });

    return transfer;
  }

  public async findTransfer({
    receive_user_id,
    send_user_id,
    status,
    value,
  }: IFindTransferDTO): Promise<Transfer | undefined> {
    const transfer = await this.ormTransferRepository.findOne({
      balance: value,
      receive_user_id,
      send_user_id,
      status,
    });

    return transfer;
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
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    const transfer = queryRunner.manager.getRepository(Transfer).create({
      balance: value,
      receive_user_id,
      send_user_id,
      status,
    });

    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(transfer);

      if (debitAcccount) {
        if (debitLimit) {
          await queryRunner.manager.getRepository(Account).update(
            { account_number: send_account_number },
            {
              balance: () => `balance - balance`,
              limit: () => `"limit" - ${debitLimit}`,
            },
          );
        } else {
          await queryRunner.manager.getRepository(Account).update(
            { account_number: send_account_number },
            {
              balance: () => `balance - ${value}`,
            },
          );
        }

        await queryRunner.manager
          .getRepository(Account)
          .update(
            { account_number: receive_account_number },
            { balance: () => `balance + ${value}` },
          );
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return transfer;
  }
}

export default TransfersRepository;

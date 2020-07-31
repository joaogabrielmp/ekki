import { getConnection, getRepository, Repository } from 'typeorm';

// import ICancelTransferDTO from '@modules/transfers/dtos/ICancelTransferDTO';
import IFindTransferDTO from '@modules/transfers/dtos/IFindTransferDTO';
import ITransferDTO from '@modules/transfers/dtos/ITransferDTO';
import ITransfersRepository from '@modules/transfers/repositories/ITransfersRepository';

import Account from '@modules/accounts/entities/Account';
import Transfer from '@modules/transfers/entities/Transfer';

class TransfersRepository implements ITransfersRepository {
  private ormRepository: Repository<Transfer>;

  constructor() {
    this.ormRepository = getRepository(Transfer);
  }

  public async processTransfer({
    receive_account_number,
    receive_user_id,
    send_account_number,
    send_user_id,
    status,
    transfer_id,
    value,
  }: ITransferDTO): Promise<Transfer> {
    // *** cancela transferência anterior
    // ***caso não cancela transferência

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
      console.log('1.1 save');
      await queryRunner.manager.save(transfer);

      console.log('1.2 save');
      await queryRunner.manager
        .getRepository(Account)
        .update(
          { account_number: send_account_number },
          { balance: () => `balance - ${value}` },
        );

      console.log('1.3 save');
      await queryRunner.manager
        .getRepository(Account)
        .update(
          { account_number: receive_account_number },
          { balance: () => `balance + ${value}` },
        );

      console.log('2 commit');
      await queryRunner.commitTransaction();
    } catch (err) {
      console.log('3 err: ', err);
      await queryRunner.rollbackTransaction();
    } finally {
      console.log('4 release');
      await queryRunner.release();
    }

    return transfer;
  }

  // public async create(data: ITransferDTO): Promise<Transfer> {
  //   const transfer = this.ormRepository.create(data);

  //   transfer.status = 'approved';

  //   await this.ormRepository.save(transfer);

  //   return transfer;
  // }

  // public async cancelTransfer({
  //   status,
  //   transfer_id,
  // }: ICancelTransferDTO): Promise<Transfer> {
  //   const transfer = await this.ormRepository.save({
  //     status,
  //     id: transfer_id,
  //   });

  //   return transfer;
  // }

  public async findTransfer({
    balance,
    beneficiary_id,
    status,
    user_id,
  }: IFindTransferDTO): Promise<Transfer | undefined> {
    const userBeneficiary = await this.ormRepository.findOne({
      balance,
      beneficiary_id,
      status,
      user_id,
    });

    return userBeneficiary;
  }
}

export default TransfersRepository;

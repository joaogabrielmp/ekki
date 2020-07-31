import { getRepository, Repository } from 'typeorm';

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
    receive_user_id,
    send_user_id,
    status,
    transfer_id,
    value,
  }: ITransferDTO): Promise<Transfer> {
    // cancela transferência anterior
    await this.ormRepository.save({ status, id: transfer_id });

    // salva transferência atual
    await this.ormRepository.create({
      balance: value,
      beneficiary_id,
      user_id,
      status: 'approved',
    });

    // caso não cancela transferência

    // subtrai saldo usuário enviou

    // adiciona saldo usuário recebeu

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

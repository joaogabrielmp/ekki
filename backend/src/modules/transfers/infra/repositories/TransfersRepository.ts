import { getRepository, Repository } from 'typeorm';

import ICancelTransferDTO from '@modules/transfers/dtos/ICancelTransferDTO';
import IFindTransferDTO from '@modules/transfers/dtos/IFindTransferDTO';
import ITransferDTO from '@modules/transfers/dtos/ITransferDTO';
import ITransfersRepository from '@modules/transfers/repositories/ITransfersRepository';

import Transfer from '@modules/transfers/entities/Transfer';

class TransfersRepository implements ITransfersRepository {
  private ormRepository: Repository<Transfer>;

  constructor() {
    this.ormRepository = getRepository(Transfer);
  }

  public async create(data: ITransferDTO): Promise<Transfer> {
    const transfer = this.ormRepository.create(data);

    transfer.status = 'approved';

    await this.ormRepository.save(transfer);

    return transfer;
  }

  public async cancelTransfer({
    beneficiary_id,
    status,
    user_id,
    transfer_id,
  }: ICancelTransferDTO): Promise<Transfer> {
    const transfer = await this.ormRepository.save({
      beneficiary_id,
      status,
      user_id,
      id: transfer_id,
    });

    return transfer;
  }

  public async findTransfer({
    balance,
    beneficiary_id,
    status,
    user_id,
  }: IFindTransferDTO): Promise<Transfer | undefined> {
    console.log('status: ', status);

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

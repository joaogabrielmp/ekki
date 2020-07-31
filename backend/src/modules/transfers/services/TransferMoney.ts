import { differenceInSeconds, subHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import ITransferDTO from '@modules/transfers/dtos/ITransferDTO';
import ITransfersRepository from '@modules/transfers/repositories/ITransfersRepository';

import transferConfig from '@config/transfer';
import Transfer from '@modules/transfers/entities/Transfer';
import AppError from '@shared/errors/AppError';

@injectable()
class TransferMoney {
  constructor(
    @inject('TransfersRepository')
    private transfersRepository: ITransfersRepository,
  ) {}

  public async execute({
    balance,
    beneficiary_id,
    user_id,
  }: ITransferDTO): Promise<Transfer> {
    const balanceMultipliedByOneHundred = balance * 100;

    const checksTransfer = await this.transfersRepository.findTransfer({
      balance: balanceMultipliedByOneHundred,
      beneficiary_id,
      status: 'approved',
      user_id,
    });

    if (checksTransfer) {
      const { updated_at } = checksTransfer;
      const UpdateAtTimeZone = subHours(updated_at, 3);

      const timePassed = differenceInSeconds(Date.now(), UpdateAtTimeZone);
      const lessThanTwoMinutes =
        timePassed <= transferConfig.timeToCancelInSeconds;

      // if (lessThanTwoMinutes) {
      //   await this.transfersRepository.cancelTransfer({
      //     status: 'cancelled',
      //     transfer_id: checksTransfer.id,
      //   });
      // }
    }

    // processTransfer

    const transfer = await this.transfersRepository.create({
      balance: balanceMultipliedByOneHundred,
      beneficiary_id,
      user_id,
    });

    return transfer;
  }
}

export default TransferMoney;

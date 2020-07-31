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
    receive_account_number,
    receive_user_id,
    send_account_number,
    send_user_id,
    value,
  }: ITransferDTO): Promise<Transfer> {
    const checksAccount = await this.transfersRepository.findAccount(
      send_account_number,
    );

    if (!checksAccount) {
      throw new AppError('Account not found');
    }

    const { balance, limit } = checksAccount;

    const totalAvailable = Number(balance) + Number(limit);

    let debitLimit;

    if (balance >= value) {
      debitLimit = 0;
    } else if (totalAvailable >= value) {
      debitLimit = value - Number(balance);
    } else {
      throw new AppError('Balance not available');
    }

    // cancelar se ter menos que 2 minutos
    // const checksTransfer = await this.transfersRepository.findTransfer({
    //   receive_user_id,
    //   send_user_id,
    //   status: 'approved',
    //   value,
    // });

    // if (checksTransfer) {
    //   const { updated_at } = checksTransfer;
    //   const UpdateAtTimeZone = subHours(updated_at, 3);

    //   const timePassed = differenceInSeconds(Date.now(), UpdateAtTimeZone);
    //   const lessThanTwoMinutes =
    //     timePassed <= transferConfig.timeToCancelInSeconds;

    //   if (lessThanTwoMinutes) {
    //     await this.transfersRepository.cancelTransfer({
    //       status: 'cancelled',
    //       transfer_id: checksTransfer.id,
    //     });
    //   }
    // }

    const transfer = await this.transfersRepository.processTransfer({
      debitLimit,
      receive_account_number,
      receive_user_id,
      send_account_number,
      send_user_id,
      status: 'approved',
      transfer_id: '1',
      value,
    });

    return transfer;
  }
}

export default TransferMoney;

import { differenceInSeconds, subHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import ITransfersRepository from '@modules/transfers/repositories/ITransfersRepository';
import IProcessTransferDTO from '@modules/transfers/dtos/IProcessTransferDTO';

import transferConfig from '@config/transfer';
import TransferStatus from '@modules/transfers/enums/TransferStatus';
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
  }: IProcessTransferDTO): Promise<Transfer | void> {
    const checksAccount = await this.transfersRepository.findAccount(
      send_account_number,
    );

    if (!checksAccount) {
      throw new AppError('Account not found');
    }

    const checksAccountBeneficiary = await this.transfersRepository.findAccount(
      receive_account_number,
    );

    if (!checksAccountBeneficiary) {
      throw new AppError('Beneficiary account not found');
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

    const checksTransfer = await this.transfersRepository.findTransfer({
      receive_user_id,
      send_user_id,
      status: TransferStatus.Approved,
      value,
    });

    let debitAccount = true;

    if (checksTransfer) {
      const { updated_at } = checksTransfer;
      const UpdateAtTimeZone = subHours(updated_at, 3);
      const currentTime = Date.now();

      const timePassed = differenceInSeconds(currentTime, UpdateAtTimeZone);

      const lessThanTwoMinutes =
        timePassed <= transferConfig.timeToCancelInSeconds;

      if (lessThanTwoMinutes) {
        await this.transfersRepository.cancelTransfer({
          status: TransferStatus.Cancelled,
          transfer_id: checksTransfer.id,
        });

        debitAccount = false;
      }
    }

    const transfer = await this.transfersRepository.processTransfer({
      debitAccount,
      debitLimit,
      receive_account_number,
      receive_user_id,
      send_account_number,
      send_user_id,
      status: TransferStatus.Approved,
      value,
    });

    return transfer;
  }
}

export default TransferMoney;

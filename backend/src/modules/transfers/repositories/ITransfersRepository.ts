import ICancelTransferDTO from '@modules/transfers/dtos/ICancelTransferDTO';
import IFindTransferDTO from '@modules/transfers/dtos/IFindTransferDTO';
import ITransferDTO from '@modules/transfers/dtos/ITransferDTO';
import Account from '@modules/accounts/entities/Account';
import Transfer from '@modules/transfers/entities/Transfer';

export default interface ITransfersRepository {
  findAccount(account_number: string): Promise<Account | undefined>;
  findTransfer(data: IFindTransferDTO): Promise<Transfer | undefined>;
  processTransfer(data: ITransferDTO): Promise<Transfer>;
  cancelTransfer(data: ICancelTransferDTO): Promise<Transfer>;
  // findAllById(id: string): Promise<Transfer | undefined>;
}

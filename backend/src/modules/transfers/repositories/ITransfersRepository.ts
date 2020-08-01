import ICancelTransferDTO from '@modules/transfers/dtos/ICancelTransferDTO';
import IFindAllTransfersDTO from '@modules/transfers/dtos/IFindAllTransfersDTO';
import IFindTransferDTO from '@modules/transfers/dtos/IFindTransferDTO';
import IProcessTransferDTO from '@modules/transfers/dtos/IProcessTransferDTO';
import Account from '@modules/accounts/entities/Account';
import Transfer from '@modules/transfers/entities/Transfer';

export default interface ITransfersRepository {
  cancelTransfer(data: ICancelTransferDTO): Promise<Transfer>;
  findAccount(account_number: string): Promise<Account | undefined>;
  findAllById(data: IFindAllTransfersDTO): Promise<Transfer[] | undefined>;
  findTransfer(data: IFindTransferDTO): Promise<Transfer | undefined>;
  processTransfer(data: IProcessTransferDTO): Promise<Transfer>;
}

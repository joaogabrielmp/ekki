import ICancelTransferDTO from '@modules/transfers/dtos/ICancelTransferDTO';
import IFindTransferDTO from '@modules/transfers/dtos/IFindTransferDTO';
import ITransferDTO from '@modules/transfers/dtos/ITransferDTO';
import Account from '@modules/accounts/entities/Account';
import Transfer from '@modules/transfers/entities/Transfer';

export default interface ITransfersRepository {
  cancelTransfer(data: ICancelTransferDTO): Promise<Transfer>;
  findAccount(account_number: string): Promise<Account | undefined>;
  findAllById(
    page: number,
    per_page: number,
    user_id: string,
  ): Promise<Transfer[] | undefined>;
  findTransfer(data: IFindTransferDTO): Promise<Transfer | undefined>;
  processTransfer(data: ITransferDTO): Promise<Transfer>;
}

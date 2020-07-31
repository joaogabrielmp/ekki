import ICancelTransferDTO from '@modules/transfers/dtos/ICancelTransferDTO';
import IFindTransferDTO from '@modules/transfers/dtos/IFindTransferDTO';
import ITransferDTO from '@modules/transfers/dtos/ITransferDTO';
import Transfer from '@modules/transfers/entities/Transfer';

export default interface ITransfersRepository {
  create(data: ITransferDTO): Promise<Transfer>;
  cancelTransfer(data: ICancelTransferDTO): Promise<Transfer>;
  findTransfer(data: IFindTransferDTO): Promise<Transfer | undefined>;
  // findAllById(id: string): Promise<Transfer | undefined>;
}

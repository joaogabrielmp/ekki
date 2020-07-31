import TransferStatus from '@modules/transfers/enums/TransferStatus';

export default interface ICancelTransferDTO {
  status: TransferStatus;
  transfer_id: string;
}

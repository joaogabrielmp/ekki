import TransferStatus from '@modules/transfers/enums/TransferStatus';

export default interface IFindTransferDTO {
  receive_user_id: string;
  send_user_id: string;
  status: TransferStatus;
  value: number;
}

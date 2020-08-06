import TransferStatus from '@modules/transfers/enums/TransferStatus';

export default interface IProcessTransferDTO {
  debitAccount?: boolean;
  debitLimit?: number;
  receive_account_number: string;
  receive_user_id: string;
  send_account_number: string;
  send_user_id: string;
  status?: TransferStatus;
  transfer_id?: string;
  value: number;
}

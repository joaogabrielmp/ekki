export default interface ITransferDTO {
  debitAcccount: boolean;
  debitLimit?: number;
  receive_account_number?: string;
  receive_user_id: string;
  send_account_number: string;
  send_user_id: string;
  status?: 'approved' | 'cancelled';
  transfer_id?: string;
  value: number;
}

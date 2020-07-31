export default interface ITransferDTO {
  receive_user_id: string;
  send_user_id: string;
  status: 'approved' | 'cancelled';
  transfer_id?: string;
  value: number;
}

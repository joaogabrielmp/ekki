export default interface IFindTransferDTO {
  receive_user_id: string;
  send_user_id: string;
  status: 'approved' | 'cancelled';
  value: number;
}

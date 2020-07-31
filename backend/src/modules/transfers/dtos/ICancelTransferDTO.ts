export default interface ICancelTransferDTO {
  beneficiary_id: string;
  status: 'approved' | 'cancelled';
  user_id: string;
  transfer_id: string;
}
